# etherscan-uploader

> A command line tool to flatten and verify contracts on Etherscan.

## Installation:

Make sure you have > node 10 LTS installed. There's currently no `yarn.lock` file, so an install with `yarn` is very likely to fail ([open issue](https://github.com/0xdefaceme/etherscan-uploader/issues/7)).

```
$ npm i -g etherscan-uploader
```

## Usage

```
$ etherscan-uploader -h
Usage: etherscan-uploader [options]

Options:
  -V, --version                          output the version number
  -f --file <path>                       Contract file to flatten
  -k --api-key <path>                    Etherscan API key
  -a --address <path>                    Contract address
  -n --name <path>                       Contract name
  -e --network <path>                    Network to upload contract
  -c --constructor-parameters [args...]  Comma separated list of constructor names (default: [])
  -v --constructor-values [args...]      Comma separated list of constructor params (default: [])
  -o --optimize                          Optimizes the contract in 200 cycles
  -h, --help                             output usage information
```

etherscan-uploader can be used to automatically verify contracts on Etherscan when deploying your contracts ([example](https://github.com/0xdefaceme/demo/blob/master/.travis.yml#L11)).
