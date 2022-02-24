import { expect } from "chai";
import { ethers, network } from "hardhat";
import { waffle } from "hardhat";
import { BigNumber, Contract, Wallet } from 'ethers'
import { GOVERNOR_BRAVO_ABI, TIMELOCK_ABI, ENS_REGISTRY_ABI, ENS_PUBLIC_RESOLVER_ABI, UNI_ABI } from "./utils";
import { namehash } from '@ethersproject/hash';
import { keccak256 } from '@ethersproject/keccak256';
import { utils } from 'ethers';
import { Interface } from '@ethersproject/abi'; 
import "hardhat";

const { provider } = waffle;

describe("Voltz / Uniswap additional use grant simulation", async () => {
  let wallet: Wallet, other: Wallet;

  async function advanceBlockHeight(blocks:number) {
    const txns = [];
    for (let i = 0; i < blocks; i++) {
      txns.push(network.provider.send('evm_mine'));
    }
    await Promise.all(txns);
  }

  it("proposal simulation", async () => {
    // get the governor bravo contract
    const governorBravoAddress = "0x408ED6354d4973f66138C91495F2f2FCbd8724C3"
    const governorBravo = new Contract(governorBravoAddress, GOVERNOR_BRAVO_ABI, provider);

    // get the timelock contract
    const timelockAddress = "0x1a9C8182C09F50C8318d769245beA52c32BE35BC";
    const timeLock = new Contract(timelockAddress, TIMELOCK_ABI, provider );

    // get signers
    [wallet, other] = await (ethers as any).getSigners();
    
    // check the timelock from the governor matches the timelock address
    const timelockAddressFromGovernor = await governorBravo.timelock()

    expect(timelockAddressFromGovernor).to.eq(timeLock.address);

    // wallet submits a proposal
    
    const NODE_TOP_LEVEL: string = namehash("uniswap.eth");
    const LABEL: string = keccak256(utils.toUtf8Bytes("v3-core-license-grants"));
    const OWNER_UNISWAP_GOVERNANCE_TIMELOCK: string = "0x1a9C8182C09F50C8318d769245beA52c32BE35BC";
    const RESOLVER_PUBLIC_ENS_RESOLVER: string = "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41";
    const TTL: number = 0;

    const NODE: string = namehash("v3-core-license-grants.uniswap.eth");
    const KEY: string = "Voltz Uni v3 Additional Use Grant";
    const VALUE: string = `
    Voltz Labs Technology Limited (“Voltz”) is granted an additional use grant to allow the Voltz DAO to use the Uniswap V3 Core software code (which is made available to Voltz subject to license available at https://github.com/Uniswap/v3-core/blob/main/LICENSE (the “Uniswap Code”)).  	
    As part of this additional use grant, the Voltz DAO receives a limited worldwide license to use the Uniswap Code for the purposes of:
    creating, deploying and making available aspects of an interest rate swap automated market maker (the “IRS AMM”); 
    to modify and update the IRS AMM over time; and 
    deploy the IRS AMM and portions thereof as smart contracts on blockchain-based applications and protocols.  
    The Voltz DAO is permitted to use subcontractors to do this work.  
    This license is conditional on Voltz and the Voltz DAO complying with the terms of the Business Source License 1.1, made available at https://github.com/Uniswap/v3-core/blob/main/LICENSE.
    `
    const ensRegistryInterface = new Interface(ENS_REGISTRY_ABI);
    const setSubnodeRecordCalldata = ensRegistryInterface.encodeFunctionData("setSubnodeRecord", [NODE_TOP_LEVEL, LABEL, OWNER_UNISWAP_GOVERNANCE_TIMELOCK, RESOLVER_PUBLIC_ENS_RESOLVER, TTL]);

    const ensPublicResolverInterface = new Interface(ENS_PUBLIC_RESOLVER_ABI);
    const setTextCalldata = ensPublicResolverInterface.encodeFunctionData("setText", [NODE, KEY, VALUE]);

    const ENS_REGISTRY_ADDRESS = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
    const PUBLIC_ENS_RESOLVER_ADDRESS: string = "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41";

    const targets = [ENS_REGISTRY_ADDRESS, PUBLIC_ENS_RESOLVER_ADDRESS];
    const values = [0, 0];
    const sigs = ['', ''];
    const calldatas = [setSubnodeRecordCalldata, setTextCalldata];
    const description = "Voltz Additional Use Grant";
    
    const ensPublicResolver = new Contract(PUBLIC_ENS_RESOLVER_ADDRESS, ENS_PUBLIC_RESOLVER_ABI, provider);
    let licenseText = await ensPublicResolver.text(NODE, KEY)

    const ensRegistry = new Contract(ENS_REGISTRY_ADDRESS, ENS_REGISTRY_ABI, provider);
    let subnodeResolver = await ensRegistry.resolver(NODE);
    let subnodeRecordExists = await ensRegistry.recordExists(NODE);
    console.log("subnodeResolver", subnodeResolver);
    expect(subnodeResolver).to.eq("0x0000000000000000000000000000000000000000");
    expect(licenseText).to.eq("");
    expect(subnodeRecordExists).to.eq(false);
    
    const a16zAddress = "0x2B1Ad6184a6B0fac06bD225ed37C2AbC04415fF4"
    // delegate votes from whales to the wallet
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [a16zAddress], // a16z
    });

    const a16zSigner = await ethers.getSigner(a16zAddress);

    // get the Uni contract
    const uniAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    const uni = new Contract(uniAddress, UNI_ABI, provider);

    
    let blockNumber = (await provider.getBlock("latest")).number;
    console.log("blockNumber OLD", blockNumber);

    // check the prior votes of a16z
    let priorVotesA16Z = await uni.getPriorVotes(a16zAddress, blockNumber - 1)
    console.log("priorVotesA16Z", priorVotesA16Z)

    // transfer ether to a16z to execute the delegation transaction
    await wallet.sendTransaction(
      {
        to: a16zAddress,
        value: ethers.utils.parseEther("1")
      }
    )
      
    let currentProposalCount = await governorBravo.proposalCount(); // expect 10
    console.log("currentProposalCount", currentProposalCount);
    expect(currentProposalCount).to.eq(10);

    // make the proposal
    await governorBravo.connect(a16zSigner).propose(targets, values, sigs, calldatas, description);

    currentProposalCount = await governorBravo.proposalCount();
    expect(currentProposalCount).to.eq(11);
    console.log("current number of proposals created: "+currentProposalCount);
    let proposalInfo = await governorBravo.proposals(11);
    console.log(proposalInfo);

    await advanceBlockHeight(13141); // fast forward through review period

    const uniWhaleAddresses = [
      "0x2b1ad6184a6b0fac06bd225ed37c2abc04415ff4",
      "0xe02457a1459b6c49469bf658d4fe345c636326bf",
      "0x8e4ed221fa034245f14205f781e0b13c5bd6a42e",
      "0x61c8d4e4be6477bb49791540ff297ef30eaa01c2",
      "0xa2bf1b0a7e079767b4701b5a1d9d5700eb42d1d1",
      "0xe7925d190aea9279400cd9a005e33ceb9389cc2b",
      "0x7e4a8391c728fed9069b2962699ab416628b19fa",
    ]

    // start casting votes
    for  (let i = 0; i < uniWhaleAddresses.length; i++) {
      
      const whaleAddress = uniWhaleAddresses[i]
      
      await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [whaleAddress], // a16z
      });

      const whaleSigner = await ethers.getSigner(whaleAddress);

      // send ether to the whale address

      await wallet.sendTransaction(
        {
          to: whaleAddress,
          value: ethers.utils.parseEther("1")
        }
      )
      
      await governorBravo.connect(whaleSigner).castVote(11,1)

    }

    await advanceBlockHeight(40320); // fast forward through voting period

    await governorBravo.connect(a16zSigner).queue(11);

    proposalInfo = await governorBravo.proposals(11);

    console.log(proposalInfo);

    await network.provider.request({
      method: "evm_increaseTime",
      params: [172800],
    });

    await advanceBlockHeight(1) //after changing the time mine one block

    await governorBravo.connect(a16zSigner).execute(11);

    proposalInfo = await governorBravo.proposals(11);

    console.log(proposalInfo); //expect "executed"

    // check ens records are correctly updated
    licenseText = await ensPublicResolver.text(NODE, KEY);
    console.log(licenseText);
    expect(licenseText).to.eq(VALUE);

    // check subrecord data
    subnodeResolver = await ensRegistry.resolver(NODE);
    console.log("subnodeResolver", subnodeResolver);

    expect(subnodeResolver.toLowerCase()).to.eq(PUBLIC_ENS_RESOLVER_ADDRESS.toLowerCase());

    let ttlOfSubnode = await ensRegistry.ttl(NODE)

    expect(ttlOfSubnode).to.eq(TTL);
    
    subnodeRecordExists = await ensRegistry.recordExists(NODE);
    expect(subnodeRecordExists).to.eq(true);

  })
})