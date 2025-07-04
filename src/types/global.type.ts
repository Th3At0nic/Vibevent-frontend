import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    errorSource: { path: string; message: string }[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};


export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    userData: {
      name: string;
      email: string;
      role: 'user' | 'admin'; // assuming these are the only roles
      photoURL: string;
    };
    accessToken: string;
  };
};
