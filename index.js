#!/usr/bin/env node
// @format
const program = require('commander');
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(fs.readFile);
const resolve = require('path').resolve;
const basename = require('path').basename;
const axios = require('axios');
const verifier = require('sol-verifier');
const rimraf = require('rimraf');

program
  .version('0.0.1')
  .option('-f --file <path>', 'Contract file to flatten')
  .option('-k --api-key <path>', 'Etherscan API key')
  .option('-a --address <path>', 'Contract address')
  .option('-n --name <path>', 'Contract name')
  .option('-e --network <path>', 'Network to upload contract')
  .option(
    '-c --constructor-parameters [args...]',
    'Comma separated list of constructor names',
    val => val.split(','),
    [],
  )
  .option(
    '-v --constructor-values [args...]',
    'Comma separated list of constructor params',
    val => val.split(','),
    [],
  )
  .parse(process.argv);

(async function flatten() {
  const modulesDir = (await exec('npm root -g')).stdout.trim();
  const path = `${modulesDir}/etherscan-uploader/node_modules/.bin/poa-solidity-flattener`;
  const file = resolve(program.file);
  const fileName = basename(file).split('.')[0];
  const args = `${path} ${file}`;
  const {stdout, stderr} = await exec(args);
  if (stderr) {
    console.log(stderr);
    process.exit();
  }

  const data = {
    key: program.apiKey,
    path: `./out/${fileName}_flat.sol`,
    contractAddress: program.address,
    network: program.network,
    contractName: fileName,
    cparams: program.constructorParameters,
    cvalues: program.constructorValues,
    optimizationFlag: program.optimize,
  };

  let res;
  try {
    res = await verifier.verifyContract(data);
  } catch (err) {
    console.log(err);
    process.exit();
  }
  rimraf.sync('./out');
  console.log('Response from Etherscan API');
  console.log(res);
})();
