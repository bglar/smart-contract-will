var Assets = artifacts.require("./Assets.sol");

module.exports = function(deployer) {
  deployer.deploy(Assets);
};
