import { useEffect, useReducer, useRef } from 'react';
import { Strophe } from 'strophe.js';
import { strophReducer } from './stropheReducer';
import { ConnectionFunctionType, executeFunction } from './utils/helpers';
import {
  setConnectedAction,
  setConnectingAction,
  setConnFailAction,
  setDisconnectedAction,
  setDisconnectingAction,
  setDomainNameAction,
} from './stropheActionGenerator';
import { StropheReducerState } from './strophe.types';

type HandlerType = {
  handlerFunc: (_payload: Element) => boolean;
  matcher: {
    namespace?: string;
    name: 'message' | 'iq' | 'presence';
    type?: string;
    id?: string;
    from?: string;
  };
};

type PropType = {
  credentials: {
    jabid: string;
    pass: string;
  };
  showLogs?: boolean;
  onConnect?: ConnectionFunctionType;
  onConnecting?: ConnectionFunctionType;
  onDisconnect?: ConnectionFunctionType;
  onDisconnecting?: ConnectionFunctionType;
  onConnFail?: ConnectionFunctionType;
  onMessage?: (_msg: Element) => boolean;
  onPresence?: (_presence: Element) => boolean;
  onIq?: (_id: Element) => boolean;
  connection: Strophe.Connection;
  handlers?: HandlerType[];
};

const initialState: StropheReducerState = {
  connecting: false,
  connected: false,
  disconnecting: false,
  disconnected: false,
  connFail: false,
  reason: null,
};

const useStrophe = ({
  credentials: { jabid, pass },
  showLogs = false,
  onConnecting,
  onConnect,
  onDisconnecting,
  onDisconnect,
  onConnFail,
  connection,
  onMessage,
  onPresence,
  onIq,
  handlers = [],
}: PropType) => {
  const [
    {
      connected,
      connecting,
      disconnected,
      disconnecting,
      reason,
      connFail,
      domainName,
    },
    dispatch,
  ] = useReducer(strophReducer, initialState);

  const onMessageHandler = useRef(null);
  const onPresenceHandler = useRef(null);
  const onIqHandler = useRef(null);
  const stropheHandlers = useRef<any[] | null>(null);

  const connectHandlers = () => {
    onMessageHandler.current = connection.addHandler(
      typeof onMessage === 'function'
        ? onMessage
        : message => {
            // eslint-disable-next-line
            if (showLogs) console.log('onMessage', message);
            return true;
          },
      undefined,
      'message'
    );

    onPresenceHandler.current = connection.addHandler(
      typeof onPresence === 'function'
        ? onPresence
        : presence => {
            // eslint-disable-next-line
            if (showLogs) console.log('onPresence', presence);
            return true;
          },
      undefined,
      'presence'
    );

    onIqHandler.current = connection.addHandler(
      typeof onIq === 'function'
        ? onIq
        : iq => {
            // eslint-disable-next-line
            if (showLogs) console.log('onIq', iq);
            return true;
          },
      undefined,
      'iq'
    );

    stropheHandlers.current = handlers.map(
      ({ handlerFunc, matcher: { namespace, name, type, id, from } }) =>
        connection.addHandler(handlerFunc, namespace, name, type, id, from)
    );
  };

  const disconnectHandlers = () => {
    connection.deleteHandler(onMessageHandler);
    connection.deleteHandler(onPresenceHandler);
    connection.deleteHandler(onIqHandler);
    if (stropheHandlers.current && Array.isArray(stropheHandlers.current)) {
      stropheHandlers.current.forEach(handler => {
        connection.deleteHandler(handler);
      });
    }
    onMessageHandler.current = null;
    onPresenceHandler.current = null;
    onIqHandler.current = null;
    stropheHandlers.current = null;
  };

  useEffect(() => {
    return disconnectHandlers;
  }, []);
  const connect = () =>
    connection.connect(jabid, pass, (status, stropheReason: string) => {
      if (showLogs) {
        // eslint-disable-next-line
        for (const stropheStatus in Strophe.Status) {
          if (Number(Strophe.Status[stropheStatus]) === status) {
            // eslint-disable-next-line
            console.info(
              `Strophe status: ${stropheStatus} reason ${stropheReason}`
            );
          }
        }
      }
      switch (status) {
        case Strophe.Status.CONNECTING:
          dispatch(setConnectingAction(stropheReason));
          executeFunction({ func: onConnecting, reason: stropheReason });
          break;
        case Strophe.Status.CONNECTED: {
          dispatch(setConnectedAction(stropheReason));
          const connectedDomainName = Strophe.getDomainFromJid(connection.jid);
          dispatch(setDomainNameAction({ domainName: connectedDomainName }));
          executeFunction({ func: onConnect, reason: stropheReason });
          connectHandlers();
          break;
        }
        case Strophe.Status.CONNFAIL:
          dispatch(setConnFailAction(stropheReason));
          executeFunction({ func: onConnFail, reason: stropheReason });
          break;
        case Strophe.Status.DISCONNECTING:
          dispatch(setDisconnectingAction(stropheReason));
          executeFunction({ func: onDisconnecting, reason: stropheReason });
          break;
        case Strophe.Status.DISCONNECTED:
          dispatch(setDisconnectedAction(stropheReason));
          executeFunction({ func: onDisconnect, reason: stropheReason });
          disconnectHandlers();
          break;
        default:
          // eslint-disable-next-line
          console.log('Default');
      }
    });

  const disconnect = (disconnectingReason: string) => {
    connection.disconnect(disconnectingReason);
  };

  return {
    connect,
    disconnect,
    connected,
    connecting,
    disconnected,
    disconnecting,
    reason,
    connFail,
    domainName,
    bareJid: Strophe.getBareJidFromJid(connection.jid),
    resource: Strophe.getResourceFromJid(connection.jid),
  };
};

export default useStrophe;
