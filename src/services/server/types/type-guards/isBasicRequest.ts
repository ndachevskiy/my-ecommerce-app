import { BasicRequest } from '../basicRequest';

export const isBasicRequest = (req: unknown): req is BasicRequest => {
  return (
    typeof req === 'object' &&
    req !== null &&
    'params' in req &&
    'query' in req &&
    'path' in req
  );
};
