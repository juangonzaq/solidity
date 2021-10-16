// https://www.npmjs.com/package/solc
const path = require('path');
const fs = require('fs');
const fileSystem = require("fs-extra");
const solc = require('solc');
const chalk = require('chalk');

const contractPath = path.resolve(__dirname, "../contracts", "UsersContract.sol");
const source = fs.readFileSync(contractPath, 'utf-8');
var input = {
    language: 'Solidity',
    sources: {
        'UsersContract.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const interface = output.contracts['UsersContract.sol'].UsersContract.abi;
const bytecode = output.contracts['UsersContract.sol'].UsersContract.evm.bytecode.object;

module.exports = {
    interface,
    bytecode,
};
/*
const exportPath = path.resolve(__dirname, "../bin/contracts");

let output = JSON.parse(solc.compile(JSON.stringify(input)));

for (let contract in output.contracts["UsersContract.sol"]) {
    fileSystem.outputJSONSync(
      path.resolve(exportPath, "UsersContract.abi"),
      output.contracts["UsersContract.sol"][contract].abi
    );

    fileSystem.outputJSONSync(
      path.resolve(exportPath, "UsersContract.bin"),
      output.contracts["UsersContract.sol"][contract].evm.bytecode.object
    );
}
 console.log(output)
 */