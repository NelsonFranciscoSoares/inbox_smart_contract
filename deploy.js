const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'hood cloth buddy wing salute staff solution sign hurt food chalk copy',
    'https://sepolia.infura.io/v3/bc8083b877994a5b81a4b3e9a037e1f6'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(abi)
                            .deploy({ data: bytecode , arguments: ['Olá Francisco!'] })
                            .send({ from: accounts[0], gas: 1000000});         
    
    console.log('Contract deployed to ', result.options.address);

    provider.engine.stop();
};

deploy();