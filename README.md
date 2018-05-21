# Octane-Sunu

Decentralized Voting Dapp running on the ethereum testnet blockchain.
Published to QmQGSz2HnRVwGDBUKxSncwNdS4bV529wgiGJGZk9NP2z28: /ipfs/QmQj8QKwqkdvnzzNKXDahbFWL8fS3ccTVipdMBKag7tbMg

# Prerequisites

```
node ^9.11
npm ^6.0.1
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

``` shell
npm install -g ganache-cli
ganache-cli
```

2. For Unit tests, run the following:
```
ng test --watch false
```

![GitHub Logo](/src/assets/unit-test-capture.png)


3. For E2E testing, run the following

```
ng e2e
```

![GitHub Logo](/src/assets/e2e-capture.png)

# Code Covegate

```
ng test --code-coverage
```
![GitHub Logo](/src/assets/code-coverage-capture.png)
































































































































```shell
packagemanager install awesome-project
awesome-project start
awesome-project "Do something!"  # prints "Nah."

``````
constructor(uint tokens, uint _tokenPrice, bytes32[] _candidates) public {
...

totalTokens = tokens;
balanceTokens = tokens;
tokenPrice = _tokenPrice;
}



Here you should say what actually happens when you execute the code above.

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/your/awesome-project.git
cd awesome-project/
packagemanager install
```

And state what happens step-by-step.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing

In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy awesome-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Features

What's all the bells and whistles this project can perform?
* What's the main functionality
* You can also do another thing
* If you get really randy, you can even do this

## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

#### Argument 1
Type: `String`  
Default: `'default value'`

State what an argument does and how you can use it. If needed, you can provide
an example below.

Example:
```bash
awesome-project "Some other value"  # Prints "You're nailing this readme!"
```

#### Argument 2
Type: `Number|Boolean`  
Default: 100

Copy-paste as many of these as you need.

## Contributing

When you publish something open source, one of the greatest motivations is that
anyone can just jump in and start contributing to your project.

These paragraphs are meant to welcome those kind souls to feel that they are
needed. You should state something like:

"If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome."

If there's anything else the developer needs to know (e.g. the code style
guide), you should link it here. If there's a lot of things to take into
consideration, it is common to separate this section to its own file called
`CONTRIBUTING.md` (or similar). If so, you should say that it exists here.

## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Project homepage: https://your.github.com/awesome-project/
- Repository: https://github.com/your/awesome-project/
- Issue tracker: https://github.com/your/awesome-project/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    my@email.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!
- Related projects:
  - Your other project: https://github.com/your/other-project/
  - Someone else's project: https://github.com/someones/awesome-project/


## Licensing

One really important part: Give your project a proper license. Here you should
state what the license is and how to find the text version of the license.
Something like:

"The code in this project is licensed under MIT license."
























# Product Name
> Short blurb about what your product does.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

One to two paragraph statement about your product and what it does.

![](header.png)

## Installation

OS X & Linux:

```sh
npm install my-crazy-module --save
```

Windows:

```sh
edit autoexec.bat
```

## Usage example

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots.

_For more examples and usage, please refer to the [Wiki][wiki]._

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
```

## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress

## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki



























