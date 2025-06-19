const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateVerifier", () => {
    let contract;
    let owner;
    let otherAccount;

    beforeEach(async () => {
        [owner, otherAccount] = await ethers.getSigners();
        const Certificate = await ethers.getContractFactory("CertificateVerifier");
        contract = await Certificate.deploy();
        await contract.waitForDeployment();
    });

    it("should deploy the contract and add a certificate", async () => {
        await contract.addCertificate("Ellie", "June 2025", "456", "Blockchain");

        const [name, date, number, course] = await contract.verifyCertificate("456");
        expect(name).to.equal("Ellie");
        expect(date).to.equal("June 2025");
        expect(number).to.equal("456");
        expect(course).to.equal("Blockchain");
    });

    it("should revert for non-existent certificates", async () => {
        await expect(contract.verifyCertificate("999"))
            .to.be.revertedWith("Certificate does not exist");
    });

    it("should revert when non-owner tries to add a certificate", async () => {
        await expect(
            contract.connect(otherAccount).addCertificate("Alex", "July 2025", "789", "solidity")
        ).to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount");
    });

});