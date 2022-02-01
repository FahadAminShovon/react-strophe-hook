import { StropheReducerState, StropheAllActions } from './strophe.types';
import {
  CONNECTED,
  CONNECTING,
  CONNFAIL,
  DISCONNECTED,
  DISCONNECTING,
  SET_DOMAIN_NAME,
} from './stropheActions';

const singleStateGenerator = (
  stateKey: keyof StropheReducerState
): StropheReducerState => ({
  connecting: false,
  connected: false,
  disconnecting: false,
  disconnected: false,
  connFail: false,
  reason: null,
  [stateKey]: true,
});

/* eslint-disable default-param-last */
export const strophReducer = (
  state: StropheReducerState = {
    connecting: false,
    connected: false,
    disconnecting: false,
    disconnected: false,
    connFail: false,
    reason: null,
  },
  action: StropheAllActions
): StropheReducerState => {
  /* eslint-enable default-param-last */
  switch (action.type) {
    case CONNECTING:
      return {
        ...singleStateGenerator('connecting'),
        ...action.payload,
      };
    case CONNECTED:
      return { ...singleStateGenerator('connected'), ...action.payload };
    case SET_DOMAIN_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case CONNFAIL:
      return { ...singleStateGenerator('connFail'), ...action.payload };

    case DISCONNECTING:
      return {
        ...singleStateGenerator('disconnecting'),
        ...action.payload,
      };
    case DISCONNECTED:
      return { ...singleStateGenerator('disconnected'), ...action.payload };
    default:
      return { ...state };
  }
};
