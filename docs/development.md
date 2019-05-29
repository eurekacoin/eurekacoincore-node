# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop eurekacoincore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/eurekacoincore-node.git
git clone git@github.com:<yourusername>/eurekacoincore-lib.git
```

To develop eurekacoin or to compile from source:

```bash
git clone git@github.com:<yourusername>/eurekacoincoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See eurekacoin documentation for building eurekacoin on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download eurekacoin distribution, you'll need to compile eurekacoind from source, and setup your configuration to use that version.


We now will setup symlinks in `eurekacoincore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf eurekacoincore-lib
ln -s ~/eurekacoincore-lib
rm -rf eurekacoind-rpc
ln -s ~/eurekacoind-rpc
```

And if you're compiling or developing eurekacoincoin:
```bash
cd ../bin
ln -sf ~/eurekacoin/src/eurekacoind
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd eurekacoincore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/eurekacoind.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/eurekacoind.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch eurekacoincore-node.json
touch package.json
```

Edit `eurekacoincore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "eurekacoind",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "eurekacoind": {
      "spawn": {
        "datadir": "/home/<youruser>/.eurekacoin",
        "exec": "/home/<youruser>/eurekacoin/src/eurekacoind"
      }
    }
  }
}
```

**Note**: To install services [eurekacoin-insight-api](https://github.com/eurekacoin/insight-api) and [eurekacoin-explorer](https://github.com/eurekacoin/eurekacoin-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/eurekacoincore-lib
ln -s ~/eurekacoincore-node
ln -s ~/eurekacoin-insight-api
ln -s ~/eurekacoin-explorer
```

Make sure that the `<datadir>/eurekacoin.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../eurekacoincore-node/bin/eurekacoincore-node start
```