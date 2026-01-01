import { Response } from "express";
import { ApiResponse } from "../universal/types/api-response.type.js";

interface IApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: unknown;
  res: Response;
}

export function sendApiResponse<T>({
  statusCode,
  message,
  data,
  error,
  res,
}: IApiResponse<T>) {
  const success = Math.floor(statusCode / 100) === 2;

  const responsePayload: ApiResponse<T> = {
    message,
    success,
    ...(data !== undefined && {data}),
    ...(error !== undefined && {error})
  };

  return res.status(statusCode).json(responsePayload);
}
