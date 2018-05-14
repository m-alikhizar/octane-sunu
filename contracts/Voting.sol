pragma solidity ^0.4.22; // We have to specify what version of the compiler this code will use.

contract Voting {

  /* Voter Information */
  struct Voter {
    address voterAddress; // the address of the voter
    uint tokens;          // the total number of tokens this voter owns.
    bool voted;           // bool to indicate that voter has casted the vote.
    bytes32 vote;         // indicate to which candidate he casted the vote.
    address delegate;
  } mapping(address => Voter) public voters;
  

  /* mapping is assiciative array or hash.
  The key of the mapping is the candidates name stored as type bytes32 and value 
  is the type unsigned integer which is used to storethe vote count.
  */
  mapping(bytes32 => uint) public candidates;
  bytes32[] public candidatesIndex;

  uint public totalTokens;    // total no. of available tokens for this election.
  uint public balanceTokens;  // total no. of tokens still available for purchase.
  uint public tokenPrice;     // price per token.


  /* When the contract is deployed on the blockchain, we'll initialize the total number
  of tokens for sale, cost per token and all candidates
  */

  constructor(uint tokens, uint _tokenPrice, bytes32[] _candidates) public {
    for(uint i = 0; i < _candidates.length; i++) {
      candidates[_candidates[i]] = uint(0);
      candidatesIndex.push(_candidates[i]);
    }

    totalTokens = tokens;
    balanceTokens = tokens;
    tokenPrice = _tokenPrice;
  }

  function totalVotesFor(bytes32 candidate) view public returns(uint) {
    return candidates[candidate];
  }

  function delegate(address to, uint tokens) public {
    
    require(!voters[msg.sender].voted);

    // Self-delegation is not allowed.
    require(to != msg.sender && voters[to].delegate == address(0));

    // Forward the delegation as long as
    // Since `sender` is a reference, this modifies `voters[msg.sender].voted`

    voters[msg.sender].delegate = to;

    voters[msg.sender].tokens -= tokens;

    voters[msg.sender].voted = true;

    if (voters[to].voted) {
        // If the delegate already voted,
        // directly add to the number of votes
        candidates[voters[to].vote] += tokens;

    } else {
        // If the delegate did not vote yet, transfer tokens to 'to' account.
        voters[to].tokens += tokens;
    }
  }

  /* instead of just taking the candidate name as an argument, we also require the no. 
  of tokens this voter wants to vote for the candidate.
  */
  function vote(bytes32 candidate, uint votesInTokens) public {
    uint index = indexOfCandidate(candidate);

    // Make sure this voter has enough tokens to cast the vote.
    require(index != uint(-1) && voters[msg.sender].tokens >= votesInTokens);

    // Make sure this voter has not yet voted.
    require(!voters[msg.sender].voted);

    candidates[candidate] += votesInTokens;

    // store how many tokens were used for this candidate
    voters[msg.sender].tokens -= votesInTokens;

    voters[msg.sender].vote = candidate;
    voters[msg.sender].voted = true;

  }

  function indexOfCandidate(bytes32 candidate) view public returns (uint) {
    for(uint i = 0; i < candidatesIndex.length; i++) {
      if (candidatesIndex[i] == candidate) {
        return i;
      }
    }
    return uint(-1);
  }

  event TokensInfo(
    uint total,
    uint available,
    uint price
  );

  function getTokensInfo() view public returns(uint, uint, uint) {
    return (totalTokens, balanceTokens, tokenPrice);
  }

  function buy() payable public {
    uint tokensToBuy = msg.value / tokenPrice;

    require(tokensToBuy <= balanceTokens);

    voters[msg.sender].voterAddress = msg.sender;
    voters[msg.sender].tokens += tokensToBuy;

    balanceTokens -= tokensToBuy;
  }

  function voterDetails(address user) view public returns(uint, bytes32, bool, address) {
    return (voters[user].tokens,
      voters[user].vote,
      voters[user].voted,
      voters[user].delegate);
  }

  /* All the ether sent by voters who purchased. the tokens is in this contracts's account.
  This method will. be used to transfer. out all those ethers in to another account.
  ****. the way this function is written currently, anyone can call this method and transfer 
  the balance in to their account. In reality, you should add check to make sure only the owner
  of this contract. can cash out.
  */

  function tokensSold() view public returns (uint) {
    return totalTokens - balanceTokens;
  }

  function balanceTokens() view public returns (uint) {
    return balanceTokens;
  }

  function transferTo(address account) public {
    account.transfer(address(this).balance);
  }

  function allCandidates() view public returns(bytes32[]) {
    return candidatesIndex;
  }

  function getTokens() view public returns (uint) {
    return totalTokens;
  }

  function getTokenPrice() view public returns (uint) {
    return tokenPrice;
  }

  function winningProposal() public view returns (bytes32) {
    int index = -1;
    uint count = 0;

    for(uint i = 0; i < candidatesIndex.length; i++) {
      if(candidates[candidatesIndex[i]] > count) {
        count = candidates[candidatesIndex[i]];
        index = int(i);
      }
    }

    require(index != -1);

    return candidatesIndex[uint(index)];
  }
}
