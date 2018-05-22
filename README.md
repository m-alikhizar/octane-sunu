# Octane-Sunu

Decentralized Voting Dapp running on the ethereum testnet blockchain.

# Demo

1. Install [MetaMask](https://metamask.io/) extension for your browser.
2. Click on MetaMask icon, Select **Rinkeby Test Network** from upper right options dropdown.
3. Create your wallet.
4. Get some ethers from [here](https://faucet.rinkeby.io/)
5. [Demo](https://gateway.ipfs.io/ipfs/QmQj8QKwqkdvnzzNKXDahbFWL8fS3ccTVipdMBKag7tbMg/#/)


# Developing

**Prerequisites**

```
node ^9.11
npm ^6.0.1
Homebrew 1.6.0
```

# Blockchain Setup

1. Install geth:
```
brew tap ethereum/ethereum
brew install ethereum
```

2. Connect to the Ethereum testnet and sync your node:
```
geth --rinkeby --fast --rpc --rpcapi personal,db,web3,eth,miner,net,txpool --cache 1024 --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain 'http://localhost:4200'
```

3. Wait while your node is being synced.


# Local Development Setup

1. Install Truffle Framework:
```
npm install -g truffle
```

2. Install dependencies in package.json by running `npm install`.

3. Open truffle console to create a new account:
```
web3.personal.createAccount('passphrase')
```

4. Unlock your account: 
```
web3.personal.unlockAccount('Your_wallet_addess', 'passphrase', gas_limit)
```

5. Check weather node is synced, type `web3.eth.syncing`, it should return 'false' once it's done syncing.

6. Compile the ***.sol** files using this command: `truffle compile`

We can also use `solc` to compile solidity files, Solc is node.js library and command-line-tool used to compile solidity files. It requires loading solidity code into string variable then call `solc.compile(<stringified code>)` method to compile into artifacts. If compilation is successful then we can get Application Binary Interface (ABI) and Bytecode from its contents.


7. Deploy the compiled artifacts to the rinkeby network: 
```
truffle migrate --network rinkeby
```

In migration phase. Migrations are javascript files under **~/migrations** directory. These files are used by truffle to stage deployment tasks onto Ethereum blockchain. Deployed code onto blockchain is immutable. This immutability is one of the big advantages of blockchains such as Ethereum i.e, If we update any change and deploy again, the old code will still be in the blockchain untouched along with all the data stored in it.

At the beginning of migration, Truffle runs **1_initial_migration** scirpt from '~/migrations' directory. The filename is prefixed with a number to indicate whether the migration ran successfully. However `truffle migrate` command requires **Migrations.sol**. Which has a specific interface that get deployed onto blockchain initially and won't be changed in future. There is a function `setCompleted` in the following that triggers every time as a migration step is completed successfully.

``` solidity
pragma solidity ^0.4.22;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
```

For the current migration **1_initial_migration** has exposed a function with parameters of which `deployer` object is in first place. This `deployer` object is the main interface to stage current deployment task onto blockchain. It is used to call its `deploy` method `deployer.deploy(Migrations)` which truffle gets to deploy the sourcefile.

The subsequent step is to executes is `2_deploy` migration script file. This migration starts with requiring 'Voting.sol', This Voting.sol is developed using **Remix IDE** and added functionality initializing proposals and vote count for each candidate and more. However it also needs `deployer` object to call deploy method to stage current deployment task with additional parameters in the following syntax.

```
const Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting, <constructor parameters>, { gas: 6700000 });
}
```

Besides passing Voting as first parameter followed by its constructor parameters. `gas` limit is also passed that tells how much max gas would consumed to execute this transaction onto blockchain. However its value should be in between low and high end configured by the network. Furthermore we can use **Remix IDE** to estimate the transaction cost.

Now if we change any thing in our 'Voting.sol' we need to create another migration script alongside with incrementing prefix in order to intact immutablity of code deployed.

8. Start the app server: 
```ng serve```

9. Navigate to localhost:4200

# Unit Tests / E2E

1. Install ganache (in memory blockchain) to execute tests locally:

`ganache-cli` is written in Javascript and distributed as a Node package via `npm`.

``` shell
npm install -g ganache-cli
```

2. To run the ganache-cli execute `ganache-cli` in terminal.

3. To Unit test Solidity files, run the following:

```
truffle test
```

Output:
![GitHub Logo](/src/assets/truffle-test-capture.png)


4. For Unit tests, run the following:
```
ng test --watch false
```

Output:
![GitHub Logo](/src/assets/unit-test-capture.png)


5. For E2E testing, run the following

```
ng e2e
```

Output:
![GitHub Logo](/src/assets/e2e-capture.png)

# Code Covegate


With the Angular CLI we can create code coverage reports. This allow us to see any parts of our code base that may not be properly tested by our unit tests. The output of code coverage reports are created with `coverage` inside the root directory project. To see the code-coverage run the following:

```
ng test --watch=false --code-coverage
```

Output:
![GitHub Logo](/src/assets/code-coverage-capture.png)

# Travis CI
This application has a default build environment with the steps for testing, building and deploying in the following:
```
script:
  - ganache-cli 1> /dev/null &
  - sleep 5
  - truffle compile
  - truffle migrate --reset
  - truffle test
  - ng lint
  - ng test --watch false
  - npm run e2e
  - ng build --base-href
```

# Contributing

* Bug fixes
  - If you find a bug, please first report it using GitHub issues.
  - If you'd like to submit a fix for a bug, create a Pull Request from your own fork and mention the issue number.
*  New Features
  - Describe the problem/feature request in a new GitHub issue.
  - If you are developing a new feature. Please write corresponding Unit tests and e2e tests.


# Deploy the application online with IPFS

0. Build the project, run the following:
```
ng build --base-href --prod
```
`ng build` compiles the application into an `~/dist` directory.

1. Install IPFS from `https://ipfs.io/docs/install/`.

2. After installing start IPFS daemon in new terminal to start a node, run the following:
```
ipfs daemon
```

3. Add `dist/` directory to the network, run `ipfs add -r dist/` in separate terminal:

4. To publish the content, run `ipfs name publish <hash-of-dist-directory>`

5. Navigate to https://gateway.ipfs.io/ipns/<your-publish-hash-here>

# Licensing

The code in this project is licensed under MIT license.
