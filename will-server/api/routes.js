const shortid = require("shortid");
const IPFS = require("ipfs-http-client");

/**
 *  The configuration for this project is configured locally as a proof of concept.
 *  The following ipf configuration can be use if a local instance has not been configured.
 *  const ipfs = IPFS({ 
      host: "ipfs.infura.io", 
      port: 5001,
      protocol: "https" 
    });
 */

const ipfs = IPFS("http://127.0.0.1:5002");

function routes(app, dbClient, willContract, ethAccounts) {

  const usersModel = dbClient.collection("users");
  const documentsModel = dbClient.collection("documents");
  const beneficiariesModel = dbClient.collection("beneficiaries");

  /**
   * POST /register
   * Add a new user to the platform.
   */
  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // TODO: MD5 Hash Password 

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      otherNames: req.body.otherNames,
      document: req.body.document,
      password: password,
      email: email,
      createdOn: Date.now(),
      updatedOn: Date.now()
    }

    if (email) {
      usersModel.findOne({email}, (err, doc) => {
        if (doc) {
          res.status(400).json({
            "status":"Failed", 
            "reason":"Already registered"
          })
        } else {
          usersModel.insertOne(data).then(item => {
            res.status(201).json({
              "status": "success",
              "id": item.ops[0]._id
            });
          })
          .catch(err => {
            res.status(500).json({
              "status":"Failed", 
              "reason": "Saving to mongoDb error."
            });
          })
        }
      })
    } else {
      res.status(400).json({
        "status":"Failed", 
        "reason":"wrong input"
      })
    }
  });

  /**
   * LOGIN existing User.
   */
  app.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email) {
      usersModel.findOne({email}, (err, doc) => {
        if (doc) {
          // TODO: Verify MD5 Hashed Password

          res.json({
            "status":"success",
            "id": doc._id
          });
        } else {
          res.status(400).json({
            "status":"Failed", 
            "reason":"Not recognised"
          });
        }
      });
    } else {
      res.status(400).json({
        "status":"Failed", 
        "reason":"wrong input"
      });
    }
  });

  /**
   * POST /upload
   * Upload the document.
   */
  app.post("/upload/:userId", async (req, res) => {
    const document = req.files;
    const userId = req.params.userId;
    const toIpfs = {
      path: document.buffer.name,
      content: document.buffer.data
    };
    const smartId = shortid.generate() + shortid.generate();

    if (document) {
      const ipfsResp = await ipfs.add(toIpfs);
      const willContractObj = await willContract;
      const accountObj = await ethAccounts;

      const cidHash = ipfsResp.cid.toString();

      willContractObj.sendIPFS(smartId, cidHash, {from: accountObj[0]})
        .then((_hash, _address) => {
          documentsModel.insertOne({
            smartId: smartId,
            _hash: _hash,
            _address: _address,
            ipfsCidHash: cidHash, 
            details: {
              name: document.buffer.name,
              size: document.buffer.size,
              encoding: document.buffer.encoding,
              mimetype: document.buffer.mimetype,
              truncated: false,
              md5: document.buffer.md5
            },
            userId: userId,
            createdOn: Date.now(),
            updatedOn: Date.now()
          });
          res.json({"status":"success", smartId});
        })
        .catch(err => {
          res.status(500).json({
            "status":"Failed", 
            "reason":"Upload error occured"
          });
        });
    } else {
      res.status(400).json({
        "status":"Failed", 
        "reason":"wrong input"
      });
    }
  });

  /**
   * GET /document/:userId
   * We can remove the `userId` path parameter if we have an authenticated user.
   * Ge a list of all the documents that belong to this user.
   */
  app.get("/documents/:userId", (req, res) => {
      const userId = req.params.userId;

      if (userId) {
        documentsModel.find({userId: userId})
          .project({_hash: 0, _address: 0, details: 0})
          .toArray()
          .then(items => {
            res.json({"status":"success", items});
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              "status":"Failed", 
              "reason": "fetching from mongoDb error."
            });
          });
      } else {
          res.status(400).json({"status":"Failed", "reason":"wrong input"});
      }
  })

  /**
   * GET /document/:userId/:documentId
   * Get a single document for display.
   */
  app.get("/document/:documentId", async (req, res) => {
    const docId = req.params.documentId

    if (docId) {
      const willContractObj = await willContract;
      const accountObj = await ethAccounts;

      documentsModel.findOne({smartId: docId},(err,doc) => {
        if (doc) {
          willContractObj.getHash(docId, {from: accountObj[0]})
            .then(async(hash) => {
              const data = ipfs.get(doc.ipfsCidHash)
              const content = []
              for await (const file of data) {              
                if (!file.content) continue;
                for await (const chunk of file.content) {
                  content.push(chunk)
                }
              }

              const docDetails = doc.details;
              docDetails["data"] = content
              res.json({"status":"success", data: docDetails})
          })
        } else {
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
      })
    } else {
        res.status(400).json({"status":"Failed", "reason":"wrong input"})
    }
  })

    /**
   * POST /beneficiaries
   * Add a beneficiary user to the platform.
   */
     app.post("/beneficiaries/:userId", (req, res) => {

      const userId = req.params.userId;

      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationalId: req.body.nationalId,
        email: req.body.email,
        testator:userId,
        createdOn: Date.now(),
        updatedOn: Date.now()
      }
  
      if (req.body.email) {
        beneficiariesModel.findOne({email}, (err, doc) => {
          if (doc) {
            res.status(400).json({
              "status":"Failed", 
              "reason":"Beneficiary already added"
            })
          } else {
            beneficiariesModel.insertOne(data).then(item => {
              res.status(201).json({
                "status": "success",
                "id": item.ops[0]._id
              });
            })
            .catch(err => {
              res.status(500).json({
                "status":"Failed", 
                "reason": "Saving to mongoDb error."
              });
            })
          }
        })
      } else {
        res.status(400).json({
          "status":"Failed", 
          "reason":"wrong input"
        })
      }
    });



      /**
   * GET /beneficiaries/:userId
   * We can remove the `userId` path parameter if we have an authenticated user.
   * Get a list of all the beneficiaries that belong to this user.
   */
  app.get("/beneficiaries/:userId", (req, res) => {
    const userId = req.params.userId;

    if (userId) {
      beneficiariesModel.find({testator: userId})
        .toArray()
        .then(data => {
          res.json({"status":"success", data});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            "status":"Failed", 
            "reason": "fetching from mongoDb error."
          });
        });
    } else {
        res.status(400).json({"status":"Failed", "reason":"wrong input"});
    }
})
  
}

module.exports = routes;
