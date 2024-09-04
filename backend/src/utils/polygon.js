const { PolygonClient } = require('@polygon/client');
const { Contract } = require('@polygon/contract');

const client = new PolygonClient({ rpcUrl: process.env.POLYGON_RPC_URL, privateKey: process.env.POLYGON_PRIVATE_KEY });

const contractAddress = 'your_contract_address';
const abi = [ /* Contract ABI here */ ];
const contract = new Contract(abi, contractAddress, client);

module.exports = { client, contract };
