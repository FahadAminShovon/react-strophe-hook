import {
  domainNameType,
  SetDomainNameAction,
  ReasonType,
  StropheConnectedAction,
  StropheConnectingAction,
  StropheConnFailAction,
  StropheDisconnectedAction,
  StropheDisconnectingAction,
} from './strophe.types';
import {
  CONNECTED,
  CONNECTING,
  CONNFAIL,
  DISCONNECTED,
  DISCONNECTING,
  SET_DOMAIN_NAME,
} from './stropheActions';

export const setConnectingAction = (
  reason: ReasonType
): StropheConnectingAction => ({
  type: CONNECTING,
  payload: { reason },
});

export const setConnectedAction = (
  reason: ReasonType
): StropheConnectedAction => ({
  type: CONNECTED,
  payload: { reason },
});

export const setConnFailAction = (
  reason: ReasonType
): StropheConnFailAction => ({
  type: CONNFAIL,
  payload: { reason },
});

export const setDisconnectingAction = (
  reason: string
): StropheDisconnectingAction => ({
  type: DISCONNECTING,
  payload: { reason },
});

export const setDisconnectedAction = (
  reason: string
): StropheDisconnectedAction => ({
  type: DISCONNECTED,
  payload: { reason },
});

export const setDomainNameAction = (
  payload: domainNameType
): SetDomainNameAction => ({
  type: SET_DOMAIN_NAME,
  payload,
});
