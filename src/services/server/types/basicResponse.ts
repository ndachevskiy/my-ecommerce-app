export type BasicResponse = {
    json: (data: any) => void;
    status: (code: number) => BasicResponse;
    send: (data: any) => void;
    locals: Record<string, any>;
  }