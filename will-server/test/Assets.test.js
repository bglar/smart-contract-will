const Assets = artifacts.require("./Assets.sol")

contract("Assets", (accounts) => {
  before(async () => {
    this.assets = await Assets.deployed()
  })

  it("deploys successfully", async () => {
    const address = await this.assets.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, "")
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it("lists properties", async () => {
    const propertyCount = await this.assets.propertyCount()
    const property = await this.assets.properties(propertyCount)
    assert.equal(property.id.toNumber(), propertyCount.toNumber())
    assert.equal(property.name, "Dummy Property")
    assert.equal(property.description, "Just a dummy property")
    assert.equal(property.propertyType, "TEST")
    assert.equal(property.active, true)
    assert.equal(propertyCount.toNumber(), 1)
  })

  it('creates properties', async () => {
    const result = await this.assets.createProperty(
        "BMW X6", "Vehicle 2020 model year", "CARS")
    const propertyCount = await this.assets.propertyCount()
    assert.equal(propertyCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), propertyCount.toNumber())
    assert.equal(event.name, "BMW X6")
    assert.equal(event.description, "Vehicle 2020 model year")
    assert.equal(event.propertyType, "CARS")
    assert.equal(event.active, true)
  })
})
