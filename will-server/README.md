# smart-contract-will server


### setting up Ganache

Download and install the package for your operating system from https://www.trufflesuite.com/ganache

### Install Dependencies

Navigate to project directory and run this commands to install server dependencies::

    cd will-server
    npm install
    npm install truffle -g

### src Folder structure
```
.
├── contracts
├── migrations
│   └── ContractA.sol
├── migrations
│   └── 1_name_migration.js
|   └── 2_name_migration.js
├── test
└── app.js
```

### Folder details
- contracts/: Directory for Solidity contracts
- migrations/: Directory for scriptable deployment files
- test/: Directory for test files for testing your application and contracts
- truffle-config.js: Truffle configuration file


### Available API Endpoints

Login::

    POST {BASE_URL}/login
    Fields: 
        - email (String) (Required)
        - password (String) (Required)

Register::

    POST {BASE_URL}/register
    Fields: 
        - email (String) (Required)
        - username (String) (Required)
        - password (String) (Required)

Document Upload::

    POST {BASE_URL}/upload
    Fields: 
        - name
        - description
        - document/file buffer

Document Access::

    GET /access/{email}/{documentId}
    Fields: 
        - email
        - documentId

