export type BasicRequest = {
    path?: string
    params?: { [key: string]: string };
    query?: { [key: string]: string | string[] };
    body?: any;
    headers?: { [key: string]: string };
    method?: string; 
    [key: string]: any;
  }