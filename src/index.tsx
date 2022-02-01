import { $build, $msg, $pres, $iq } from 'strophe.js';

export { default as useStrophe } from './useStrophe/useStrophe';
export const stropheBuilder = {
  build: $build,
  message: $msg,
  presence: $pres,
  iq: $iq,
};
