const { network } = require("hardhat")
const developmentChains = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // calculated value base on the gas price on the chain

// Eth price skyrocket to $1,000,000,000
// Chainlink Nodes pay the gas fees to give us randomness & do eternale execution
// So the price the request change based on the price of gas to not go pleite

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]
    const chainId = network.config.chainId
    // const chainId = network.config.chainId

    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...")
        // deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed")
        log("-------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
