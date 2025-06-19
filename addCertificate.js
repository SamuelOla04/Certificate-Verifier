const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("using account:", deployer.address);

    const contract = await hre.ethers.getContractFactory("CertificateVerifier");
    const certificateVerifier = await contract.deploy();
    await certificateVerifier.deployed();

    console.log("contract deployed to", certificateVerifier.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
