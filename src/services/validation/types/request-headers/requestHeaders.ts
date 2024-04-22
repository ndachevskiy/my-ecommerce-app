import { ContentType } from './enums/contentType';

export type RequestHeaders = {
  'Content-Type': ContentType;
  Service: string;
  'Transaction-ID': string;
};
