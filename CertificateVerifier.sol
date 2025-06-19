// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateVerifier is Ownable {
    constructor() Ownable(msg.sender) {}

    struct Certificate {
        string name;
        string date;
        string certNo;
        string course;
    }

    mapping(string => Certificate) private certificates;

    event CertificateAdded(string certNo, string name, string date, string course);

    function addCertificate(
        string memory name,
        string memory date,
        string memory certNo,
        string memory course
    ) public onlyOwner {
        require(bytes(certificates[certNo].certNo).length == 0, "Certificate already exists");
        certificates[certNo] = Certificate(name, date, certNo, course);
        emit CertificateAdded(certNo, name, date, course);
    }

    function verifyCertificate(string memory certNo)
        public
        view
        returns (string memory name, string memory date, string memory course)
    {
        Certificate memory cert = certificates[certNo];
        require(bytes(cert.certNo).length != 0, "Certificate does not exist");
        return (cert.name, cert.date, cert.course);
    }
}
