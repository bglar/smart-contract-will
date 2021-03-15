const DocumentStorage = artifacts.require("./DocumentStorage.sol")

contract("DocumentStorage", accounts =>{
    it("emit event when you send a ipfs address", async() => {
        const ipfsInbox = await IPFSInbox.deployed()
        eventEmitted = false

        await ipfsInbox.ipfsSent((err,res)=>{
            eventEmitted=true
        })
        await ipfsInbox.sendIPFS(accounts[1], "sampleAddress", {from: accounts[0]})
        assert.equal(eventEmitted, true, "sending an IPFS request does not emit an event")
    })
})
