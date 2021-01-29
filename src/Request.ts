import rp from 'request-promise';
import * as T from '../types';

const { env }: any = process;
const {
  API_KEY_COINS
}: T.Env = env;

type RequestOptions = {
  method: string;
  uri: string;
  qs: any
  headers: any;
  json: boolean;
  gzip: boolean;
};

type RequestResult<U> = {
  error: boolean;
  body: U;
  message: string;
}

export default class Request {
  constructor() {}
  send<U>(requestOptions: RequestOptions): Promise<RequestResult<U>> {
    return new Promise(resolve => {
      rp(requestOptions)
        .then(response => {
          resolve({
            error: false,
            message: 'Success',
            body: response
          });
        })
        .catch((err) => {
          resolve({
            error: true,
            message: err.message,
            body: err
          });
        });
    });
  }
}

  