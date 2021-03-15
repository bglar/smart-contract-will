const express= require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./api/routes");
const Web3 = require("web3");
const mongodb = require("mongodb").MongoClient;
const contract = require("@truffle/contract");
const artifacts = require("./build/contracts/DocumentStorage.json");

const app =express();
require("dotenv").config();

const BLOCKCHAIN_SERVER_URL = process.env.BLOCKCHAIN_SERVER_URL || "http://localhost:7545";
const DB_SERVER_URL = process.env.DB_SERVER_URL || "mongodb://localhost:27017/lastwill_contracts";
const API_SERVER_PORT = process.env.PORT || 8082;
const CONTRACT_SERVER_LOC = process.env.CONTRACT_SERVER_LOC;

/**
 * Enable files upload
 **/
app.use(fileUpload({
  createParentPath: true
}));

/**
 * Configure middleware.
 */
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

/**
 * Initialize Web3 instance. 
 */
if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(BLOCKCHAIN_SERVER_URL))
}

/**
 * Build a contract from migrated JSON file using truffle-contract package.
 * The initialise Web3 instance is used to set a contract provider.
 */
const WILL = contract(artifacts)
WILL.setProvider(web3.currentProvider)

// CORS config
app.all("/*", function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key,Authorization");
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

mongodb.connect(DB_SERVER_URL, { 
  useUnifiedTopology: true,
  useNewUrlParser: true}, (err, client) => {
    if (err) {
      return console.log(err);      
    }
  
    const dbClient = client.db()
    const accounts = web3.eth.getAccounts();
    const willContract = WILL.deployed();

    if (CONTRACT_SERVER_LOC) {
      /**
       * For remote nodes deployed on ropsten or rinkeby.
       */
      const willContract = WILL.at(CONTRACT_SERVER_LOC);
    }
  
    routes(app, dbClient, willContract, accounts)
    app.listen(process.env.PORT || 8082, () => {
      console.log("**********************");
      console.log("listening on port " + API_SERVER_PORT);
      console.log("**********************");
    });
})
