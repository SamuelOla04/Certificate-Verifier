require("hardhat");
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("deploying contract with account:", deployer.address);

    const CertificateVerifier = await ethers.getContractFactory("CertificateVerifier");
    const certificateVerifier = await CertificateVerifier.deploy();
    await certificateVerifier.waitForDeployment();

    console.log("contract deployed to", await certificateVerifier.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
