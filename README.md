
## What is React-Strophe-hook

[Strophe.js](https://strophe.im/strophejs/) is a popular library to handle xmpp requests on browser. 
When the library is published jquery was the hot thing. So , it follows jquery approaches. 
This hook is a wrapper on top of strophe.js to make react implementation easier.

a working implementation can be found [here](https://github.com/FahadAminShovon/strophe-react-example)

## installation

```bash
npm i react-strophe-hook
```
or
```bash
yarn add react-strophe-hook
```

## Basic Implementation
```jsx
import React, { useEffect } from 'react';
import { Strophe } from 'strophe.js';
import { useStrophe } from 'react-strophe-hook';

const BOSH_SERVER = 'wss://boshServer.com';
const connection = new Strophe.Connection(BOSH_SERVER);
const credentials = {
  jabid: id@jabberDomain.com,
  pass: password,
};

function App() {
  const {
    connect,
    connected,
    disconnect,
    connecting,
    disconnecting,
    disconnected,
    domainName,
    resource,
    bareJid,
  } = useStrophe({
    credentials,
    connection,
    showLogs: true,
  });

  useEffect(() => {
    connect();
    return () => {
      disconnect('unmounted');
    };
  }, []);


  return (
    <div>
      {connecting && <p>Connecting...</p>}
      {disconnecting && <p>Disconnecting...</p>}
      <div>
        <p>The server is {connected ? 'connected' : 'disconnected'}</p>
      </div>

      <div>
        {connected && (
          <button type="button" onClick={() => disconnect('TESTING')}>
            Disconnect
          </button>
        )}
        {disconnected && (
          <button type="button" onClick={connect}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
```

## Parameters

| name | type |required| default | description |
|--|--|--|--|--|
| credentials | `{jabid: string; pass: string;}`  | true |undefined | creddentials of jabb user and password |
|onConnect | (reason?:  string) =>  void | false | undefined | Executes when xmpp connection is established.
|onConnecting | (reason?: string) => void | false | undefined | Executes when xmpp connection is being established 
| onDisconnect | (reason?: string) => void | false | undefined | Executes when xmpp connection is Disconnected
| onDisconnecting | (reason?: string) => void | false | undefined | Executes when xmpp connection is being Disconnected
| onConnFail | (reason?: string) => void | false | undefined | Executes when failed to establish xmpp connection
| connection |Strophe.Connection | true | null | Strophe connection object
| onMessage | (msg: Element) => boolean | false | null | Catches message stanzas, if the function returns false, it'll catch single message and the handler will be deleted, if true is returned it will catch all catch call message stanzas.If the function is not passed and showLogs is set to true, it'll console log the messages.
|onPresence | (presence: Element) => boolean| false | null | Catches presence stanzas, if the function returns false, it'll catch single presence and the handler will be deleted, if true is returned it will catch all catch call presence stanzas. If the function is not passed and showLogs is set to true, it'll console log the presences.
|onIq | (iq: Element) => boolean | false | null | Catches iq stanzas, if the function returns false, it'll catch single iq and the handler will be deleted, if true is returned it will catch all catch iq stanzas.If the function is not passed and showLogs is set to true, it'll console log the iqs.
handlers | ```{  handlerFunc: (_payload:  Element) =>  boolean;  matcher:{  namespace?:  string;  name:  'message'  |  'iq'  |  'presence';  type?:  string;  id?:  string;  from?:  string;  };  }[]``` | false | [] | takes array of objects. Each object has two key,value pair. **handlerFunc** same as onMessage, onIq, onStanza functions. **matcher** an object has five keys **namespace**?: string; **name**: 'message' | 'iq' | 'presence';     **type**?: string;  **id**?: string; **from**?: string; all the keys are optional. If an matcher is passed as an empty object, it'll match all the stanzas.
| showLogs | boolean | false | false | if set to true, it'll show all event logs

## Return values
| name | type | description
|--|--|--|
| connect | () =>  void | call this function to establish connection |
| disconnect | () => void | call this function to gracefully disconnect |
|     connected | boolean | returns true if connection established successfully |
connecting | boolean | returns true if connection is being established, can be used to show a loader
|    disconnected | boolean | returns true is connection disconnected
disconnecting | boolean | returns true if connection is being disconnected, can be used to show a loader
connFail | boolean | returns true if connection is failed
domainName | `string|undefined` | returns domain name once connection is established
bareJid | string | returns jid without domain name
resource | string | returns resource