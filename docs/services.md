# Services
eurekacoincore Node has a service module system that can start up additional services that can include additional:
- Blockchain indexes (e.g. querying balances for addresses)
- API methods
- HTTP routes
- Event types to publish and subscribe

The `eurekacoincore-node.json` file describes which services will load for a node:

```json
{
  "services": [
    "eurekacoind", "web"
  ]
}
```

Services correspond with a Node.js module as described in 'package.json', for example:

```json
{
  "dependencies": {
    "eurekacoincore-lib": "^0.0.1",
    "eurekacoincore-node": "^0.0.1",
    "eurekacoin-insight-api": "^0.0.1"
  }
}
```

_Note:_ If you already have a eurekacoincore-node database, and you want to query data from previous blocks in the blockchain, you will need to reindex. Reindexing right now means deleting your eurekacoincore-node database and resyncing.

## Using Services Programmatically
If, instead, you would like to run a custom node, you can include services by including them in your configuration object when initializing a new node.

```js
//Require eurekacoincore
var eurekacoincore = require('eurekacoincore-node');

//Services
var EurekaCoin = eurekacoincore.services.EurekaCoin;
var Web = eurekacoincore.services.Web;

var myNode = new eurekacoincore.Node({
  network: 'regtest',
  services: [
    {
      name: 'eurekacoind',
      module: EurekaCoin,
      config: {
        spawn: {
          datadir: '/home/<username>/.eurekacoin',
          exec: '/home/<username>/eurekacoincore-node/bin/eurekacoind'
        }
      }
    },
    {
      name: 'web',
      module: Web,
      config: {
        port: 3001
      }
    }
  ]
});
```

Now that you've loaded your services you can access them via `myNode.services.<service-name>.<method-name>`. For example if you wanted to check the balance of an address, you could access the address service like so.

```js
myNode.services.eurekacoind.getAddressBalance('1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', false, function(err, total) {
  console.log(total.balance); //Satoshi amount of this address
});
```

## Writing a Service
A new service can be created by inheriting from `Node.Service` and implementing these methods and properties:
- `Service.dependencies` -  An array of services that are needed, this will determine the order that services are started on the node.
- `Service.prototype.start()` - Called to start up the service.
- `Service.prototype.stop()` - Called to stop the service.
- `Service.prototype.blockHandler()` - Will be called when a block is added or removed from the chain, and is useful for updating a database view/index.
- `Service.prototype.getAPIMethods()` - Describes which API methods that this service includes, these methods can then be called over the JSON-RPC API, as well as the command-line utility.
- `Service.prototype.getPublishEvents()` - Describes which events can be subscribed to for this service, useful to subscribe to events over the included web socket API.
- `Service.prototype.setupRoutes()` - A service can extend HTTP routes on an express application by implementing this method.

The `package.json` for the service module can either export the `Node.Service` directly, or specify a specific module to load by including `"eurekacoincoreNode": "lib/eurekacoincore-node.js"`.

Please take a look at some of the existing services for implementation specifics.

