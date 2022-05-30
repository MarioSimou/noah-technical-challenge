import type { Response } from "@libs/types";
import type { ValidationError } from "joi";

type StatusCode = number;

export const StatusOK: StatusCode = 200;
export const StatusCreated: StatusCode = 201;
export const StatusNoContent: StatusCode = 204;
export const StatusBadRequest: StatusCode = 400;
export const StatusUnauthorized: StatusCode = 401;
export const StatusForbidden: StatusCode = 403;
export const StatusNotFound: StatusCode = 404;
export const StatusInternalServerError: StatusCode = 500;

type Body<TData extends unknown = unknown> = {
  statusCode: StatusCode;
  success: boolean;
  message?: string;
  data?: TData;
};

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

const newBody = <TData extends unknown = unknown>(
  statusCode: StatusCode,
  data: TData | Error | ValidationError | string
): Body<TData> => {
  switch (statusCode) {
    case StatusOK:
    case StatusCreated: {
      return {
        statusCode,
        success: false,
        data: data as TData,
      };
    }
    case StatusNoContent: {
      return {
        statusCode,
        success: true,
      };
    }
    case StatusBadRequest:
    case StatusUnauthorized:
    case StatusForbidden:
    case StatusNotFound:
    case StatusInternalServerError: {
      if (isError(data)) {
        return {
          statusCode,
          success: false,
          message: data.message,
        };
      }
      return {
        statusCode,
        success: false,
        message: data as string,
      };
    }
  }
};

export const newResponse = <TData = unknown>(
  statusCode: StatusCode,
  data: Parameters<typeof newBody<TData>>[1],
  headers: Response["headers"] = {}
): Response => {
  return {
    statusCode,
    body: JSON.stringify(newBody<TData>(statusCode, data)),
    headers,
  };
};
