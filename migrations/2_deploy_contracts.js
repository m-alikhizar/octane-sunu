var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
	deployer.deploy(Voting, 1000, web3.toWei(0.000000000000000001, 'ether'), ['zain', 'nick', 'salman'], {gas: 6700000});
}