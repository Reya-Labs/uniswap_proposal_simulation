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

## Run the Simulation
```
npx hardhat test
```
