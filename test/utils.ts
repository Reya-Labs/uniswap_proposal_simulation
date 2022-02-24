

export const GOVERNOR_BRAVO_ABI = [
  'event NewAdmin(address oldAdmin, address newAdmin)',
  'event NewImplementation(address oldImplementation, address newImplementation)',
  'event NewPendingAdmin(address oldPendingAdmin, address newPendingAdmin)',
  'event ProposalCanceled(uint256 id)',
  'event ProposalCreated(uint256 id, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)',
  'event ProposalExecuted(uint256 id)',
  'event ProposalQueued(uint256 id, uint256 eta)',
  'event ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold)',
  'event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 votes, string reason)',
  'event VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay)',
  'event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod)',
  'function BALLOT_TYPEHASH() view returns (bytes32)',
  'function DOMAIN_TYPEHASH() view returns (bytes32)',
  'function MAX_PROPOSAL_THRESHOLD() view returns (uint256)',
  'function MAX_VOTING_DELAY() view returns (uint256)',
  'function MAX_VOTING_PERIOD() view returns (uint256)',
  'function MIN_PROPOSAL_THRESHOLD() view returns (uint256)',
  'function MIN_VOTING_DELAY() view returns (uint256)',
  'function MIN_VOTING_PERIOD() view returns (uint256)',
  'function _acceptAdmin()',
  'function _initiate(uint256 proposalCount)',
  'function _setPendingAdmin(address newPendingAdmin)',
  'function _setProposalThreshold(uint256 newProposalThreshold)',
  'function _setVotingDelay(uint256 newVotingDelay)',
  'function _setVotingPeriod(uint256 newVotingPeriod)',
  'function admin() view returns (address)',
  'function cancel(uint256 proposalId)',
  'function castVote(uint256 proposalId, uint8 support)',
  'function castVoteBySig(uint256 proposalId, uint8 support, uint8 v, bytes32 r, bytes32 s)',
  'function castVoteWithReason(uint256 proposalId, uint8 support, string reason)',
  'function execute(uint256 proposalId) payable',
  'function getActions(uint256 proposalId) view returns (address[] targets, uint256[] values, string[] signatures, bytes[] calldatas)',
  'function getReceipt(uint256 proposalId, address voter) view returns (tuple(bool hasVoted, uint8 support, uint96 votes))',
  'function implementation() view returns (address)',
  'function initialProposalId() view returns (uint256)',
  'function initialize(address timelock_, address uni_, uint256 votingPeriod_, uint256 votingDelay_, uint256 proposalThreshold_)',
  'function latestProposalIds(address) view returns (uint256)',
  'function name() view returns (string)',
  'function pendingAdmin() view returns (address)',
  'function proposalCount() view returns (uint256)',
  'function proposalMaxOperations() view returns (uint256)',
  'function proposalThreshold() view returns (uint256)',
  'function proposals(uint256) view returns (uint256 id, address proposer, uint256 eta, uint256 startBlock, uint256 endBlock, uint256 forVotes, uint256 againstVotes, uint256 abstainVotes, bool canceled, bool executed)',
  'function propose(address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, string description) returns (uint256)',
  'function queue(uint256 proposalId)',
  'function quorumVotes() view returns (uint256)',
  'function state(uint256 proposalId) view returns (uint8)',
  'function timelock() view returns (address)',
  'function uni() view returns (address)',
  'function votingDelay() view returns (uint256)',
  'function votingPeriod() view returns (uint256)',
]


export const TIMELOCK_ABI = [
    'function executeTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) payable returns (bytes)',
    'function acceptAdmin()',
    'function pendingAdmin() view returns (address)',
    'function queueTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) returns (bytes32)',
    'function setPendingAdmin(address pendingAdmin_)',
    'function cancelTransaction(address target, uint256 value, string signature, bytes data, uint256 eta)',
    'function delay() view returns (uint256)',
    'function MAXIMUM_DELAY() view returns (uint256)',
    'function MINIMUM_DELAY() view returns (uint256)',
    'function GRACE_PERIOD() view returns (uint256)',
    'function setDelay(uint256 delay_)',
    'function queuedTransactions(bytes32) view returns (bool)',
    'function admin() view returns (address)',
    'constructor(address admin_, uint256 delay_)',
    'event NewAdmin(address indexed newAdmin)',
    'event NewPendingAdmin(address indexed newPendingAdmin)',
    'event NewDelay(uint256 indexed newDelay)',
    'event CancelTransaction(bytes32 indexed txHash, address indexed target, uint256 value, string signature, bytes data, uint256 eta)',
    'event ExecuteTransaction(bytes32 indexed txHash, address indexed target, uint256 value, string signature, bytes data, uint256 eta)',
    'event QueueTransaction(bytes32 indexed txHash, address indexed target, uint256 value, string signature, bytes data, uint256 eta)',
  ]
  

export const ENS_REGISTRY_ABI = [
    'event NewOwner(bytes32 indexed node, bytes32 indexed label, address owner)',
    'event Transfer(bytes32 indexed node, address owner)',
    'event NewResolver(bytes32 indexed node, address resolver)',
    'event NewTTL(bytes32 indexed node, uint64 ttl)',
    'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
    'function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl) external',
    'function ttl(bytes32 node) public view returns (uint64)',
    'function resolver(bytes32 node) public view returns (address)',
    'function recordExists(bytes32 node) public view returns (bool)'
];

export const ENS_PUBLIC_RESOLVER_ABI = [
    'function setText(bytes32 node, string calldata key, string calldata value) external',
    'function text(bytes32 node, string calldata key) external view returns (string memory)'
];

export const UNI_ABI = [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"minter_","type":"address"},{"internalType":"uint256","name":"mintingAllowedAfter_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"address","name":"newMinter","type":"address"}],"name":"MinterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint96","name":"votes","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumTimeBetweenMints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"mintCap","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mintingAllowedAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter_","type":"address"}],"name":"setMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

