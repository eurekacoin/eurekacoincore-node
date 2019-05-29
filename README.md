EurekaCoincore Node
============

A EUREKACOIN full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install eurekacoin-bitcore https://github.com/eurekacoin/eurekacoin-bitcore - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install eurekacoincore-node  

    ```bash
    npm i https://github.com/eurekacoin/eurekacoincore-node.git#master

    $(npm bin)/eurekacoincore-node create mynode

    cd mynode

    ```  
5. Edit eurekacoincore-node.json  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
	    "eurekacoind",
        "web"
      ],
      "servicesConfig": {
        "eurekacoind": {
          "spawn": {
            "datadir": "/home/user/.eurekacoin",
            "exec": "/home/user/eurekacoin-bitcore/src/eurekacoind"
          }
        }
      }
	}
    ```  
6. Edit eurekacoin.conf  

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
7. Run Node  

    ```
    $(npm bin)/eurekacoincore-node start
    ```  

## Add-on Services

There are several add-on services available to extend the functionality of EurekaCoincore:

- [EUREKACOIN Insight API](https://github.com/eurekacoin/insight-api)
- [EUREKACOIN Explorer](https://github.com/eurekacoin/eurekacoin-explorer)

## Contributing



## License
