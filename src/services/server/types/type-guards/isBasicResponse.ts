import { BasicResponse } from '../basicResponse';

export const isBasicResponse = (res: unknown): res is BasicResponse => {
  return (
    typeof res === 'object' &&
    res !== null &&
    'json' in res &&
    'status' in res &&
    'send' in res
  );
};
