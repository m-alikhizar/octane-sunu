// Allows us to use ES6 in our migrations and tests.
require('babel-register')
// babel-polyfill as we need it to use async/await
require('babel-polyfill')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      from: "0xff0103691ee2826f1dc916e117edd66b56c92964",
      gas: 6000000 // Gas limit used for deploys
    },

 	rinkeby: {
	  host: "localhost", // Connect to geth on the specified
	  port: 8545,
	  network_id: '*',
	  from: "0x955165032303993ecc8b29b02ad1591833b55c4b", // default address to use for any transaction Truffle makes during migrations
	  gas: 470000 // Gas limit used for deploys
	}
  }
}
