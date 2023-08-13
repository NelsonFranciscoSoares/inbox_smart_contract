const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const sourceCode = fs.readFileSync(inboxPath, 'utf-8');
module.exports = compile(sourceCode, 'Inbox');

function compile(sourceCode, contractName) {
  const input = {
    language: 'Solidity',
    sources: {
      main: {
        content: sourceCode
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode']
        }
      }
    }
  };

  const output = solc.compile(JSON.stringify(input));

  const artifact = JSON.parse(output).contracts.main[contractName];

  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}