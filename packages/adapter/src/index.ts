import axios, { type AxiosError, type Axios } from "axios";
import type { ServerError, File } from "./types";

export enum ApiRouts {
  LOG_IN = 'auth/login',
  FING_FILE_BY_ID = 'files/',
  FING_FILE_BY_OWNER_ID = 'files/owner/'
}

export class Adapter {
  axios: Axios;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });
  }

  login(data: { username: string, password: string}) {
    return axios.post(ApiRouts.LOG_IN, data).then((res) => res.data);
  }
  findFileById(id: string) {
    return axios.get<File | null>(ApiRouts.FING_FILE_BY_ID + id).then((res) => res.data);
  }
  findFilesByOwnerId(id: string) {
    return axios.get<File[] | null>(ApiRouts.FING_FILE_BY_OWNER_ID + id).then((res) => res.data);
  }

  prepareError(error: Error | AxiosError): ServerError {
    if (axios.isAxiosError(error)) {
      return {
        statusCode: error.status as number,
        message: error.message,
      };
    } else {
      return {
        statusCode: 0,
        message: error.message,
      };
    }
  }
}


// const apiConfig = {

// }