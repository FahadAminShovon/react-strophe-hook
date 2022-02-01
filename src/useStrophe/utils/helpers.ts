import { ReasonType } from '../strophe.types';

export type ConnectionFunctionType = (_reason?: ReasonType) => void;
type ExecuteFunctionType = {
  func?: ConnectionFunctionType;
  reason: ReasonType;
};

export const executeFunction = ({ func, reason }: ExecuteFunctionType) => {
  if (typeof func === 'function') {
    func(reason);
  }
};
