import {
  CONNFAIL,
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  DISCONNECTING,
  SET_DOMAIN_NAME,
} from './stropheActions';

export type ReasonType = string | null | undefined;
export interface ReasonPayload {
  reason: ReasonType;
}

export interface domainNameType {
  domainName?: string;
}
export interface domainNamePayload {
  payload: domainNameType;
}

type ConnectionPayload = {
  payload: ReasonPayload;
};
export interface StropheReducerState extends ReasonPayload, domainNameType {
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;
  disconnected: boolean;
  connFail: boolean;
  domainName?: string;
}

export interface StropheConnectingAction extends ConnectionPayload {
  type: typeof CONNECTING;
}

export interface StropheConnectedAction extends ConnectionPayload {
  type: typeof CONNECTED;
}

export interface StropheConnFailAction extends ConnectionPayload {
  type: typeof CONNFAIL;
}

export interface StropheDisconnectingAction extends ConnectionPayload {
  type: typeof DISCONNECTING;
}

export interface StropheDisconnectedAction extends ConnectionPayload {
  type: typeof DISCONNECTED;
}

export interface SetDomainNameAction extends domainNamePayload {
  type: typeof SET_DOMAIN_NAME;
}

export type StropheAllActions =
  | StropheConnectingAction
  | StropheConnectedAction
  | StropheDisconnectingAction
  | StropheDisconnectedAction
  | StropheConnFailAction
  | SetDomainNameAction;
