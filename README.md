# Uniswap Additional Use Grant for Voltz Protocol Proposal Simulation

This repository runs a simulation of the Voltz' proposal to Uniswap Governance to request the Additional Use Grant. More details on how the grant is practically provided can be found in here https://github.com/Uniswap/deploy-v3 (under the Licensing section). The simulation is executed by running a test scenario in https://github.com/Voltz-Protocol/uniswap_proposal_simulation/blob/main/test/index.ts. 


# Run the simulation

In order to run the simulation the following steps need to be taken:

## Setup
```
git clone https://github.com/Voltz-Protocol/uniswap_proposal_simulation.git
cd uniswap_proposal_simulation
npm install
```

Additionally, since the simulation is done on top of the Ethereum Mainnet fork, we need to connect with the Alchemy api to get access to their archive node. This is done by updating the network url in https://github.com/Voltz-Protocol/uniswap_proposal_simulation/blob/main/hardhat.config.ts to the one provided by Alchemy.

## Run the Simulation
```
npx hardhat test
```
