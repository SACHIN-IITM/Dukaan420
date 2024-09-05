const Web3 = require('web3');
require('dotenv').config();

const rpcUrl = process.env.POLYGON_RPC_URL; 
const privateKey = process.env.PRIVATE_KEY; 

const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

module.exports = web3;
