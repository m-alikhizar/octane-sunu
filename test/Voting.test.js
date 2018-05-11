var DistrictBallot = artifacts.require("./DistrictBallot.sol");
var Web3 = require("web3");
require('babel-polyfill');


contract('DistrictBallot', function([owner]) {

  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  const tokenPrice = web3.toWei(0.000000000000000001, 'ether');

  before('setup contract for tests', async function () {

    instance = await DistrictBallot.new(1000, tokenPrice, ['candid-1', 'candid-2', 'candid-3']);

  });

  it('should have 1000 tokens in the contract', async function () {
    assert.equal(await instance.getTokens(), 1000);
  });

  it('should have a array of 3 candidates initialized', async function () {
    
    const expected = ['candid-1', 'candid-2', 'candid-3'];

    const candidates = await instance.allCandidates();

    const candidateNames = candidates.map(c => web3.toUtf8(c));

    expect(candidateNames).to.be.an('array').that.to.eql(expected);

  });

  it('should have set the token price', async function () {
    
    const expected = tokenPrice;

    const price = await instance.getTokenPrice();

    expect(price.toString()).equal(expected.toString());

  });

  it('should buy tokens from contract to an account', async function () {
    const tokens = 10;
    const expected = tokens;

    const tokenPriceInWei = await instance.getTokenPrice();
    const account = web3.personal.listAccounts[0];
    const actualAmountBuy = parseFloat(
      web3.fromWei(tokenPriceInWei.toString())
    ) * tokens;

    const result = await instance.buy(
      { value: web3.toWei(actualAmountBuy, 'ether'), from: account });

    const details = await instance.voterDetails(account);

    expect(expected).equal(parseInt(details[0]));
  });

  it('should vote in tokens from an account', async function () {

    const account = web3.personal.listAccounts[0];

    const before = await instance.voterDetails(account);

    expect(false).equal(before[2]);

    const candidates = await instance.allCandidates();

    const proposal = web3.toUtf8(candidates.shift());

    await instance.vote(proposal, 1, {gas: 140000, from: account})

    const after = await instance.voterDetails(account);

    expect(true).equal(after[2]);

  });

  it('should delegate vote in tokens to an account', async function () {

    const account = web3.personal.listAccounts[1];
    const delegateTo = web3.personal.listAccounts[0];
    const tokens = 1;

    const before = await instance.voterDetails(account);

    expect(false).equal(before[2]);

    const candidates = await instance.delegate(delegateTo, tokens, {gas: 140000, from: account});

    const after = await instance.voterDetails(account);

    expect(true).equal(after[2]);

    expect(parseInt(before[0]) + tokens).equal(parseInt(after[0]));

  });
  
});
