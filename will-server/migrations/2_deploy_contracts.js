var Assets = artifacts.require("./Assets.sol");
var DocumentStorage = artifacts.require("./DocumentStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(Assets);
  deployer.deploy(DocumentStorage);
};
