import { AxiosError, AxiosResponse } from "axios";

export interface APIRes {
  status: number;
  message: string;
}

export interface ResSuccess<T = undefined> extends APIRes {
  data: T;
}

export interface ResFail extends AxiosError {
  response?: AxiosResponse<APIRes>;
}
