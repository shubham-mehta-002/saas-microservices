import { Response } from "express";

interface IApiResponse {
  statusCode: number;
  message: string;
  data?: any;
  error?: any;
  res: Response;
}

export function sendApiResponse({
  statusCode,
  message,
  data,
  error,
  res,
}: IApiResponse) {
  const success = Math.floor(statusCode / 100) === 2;

  const responsePayload: any = {
    message,
    success,
  };

  // Include data if present
  if (data !== undefined) {
    responsePayload.data = data;
  }

  // Include error if present
  if (error !== undefined) {
    responsePayload.error = error;
  }

  return res.status(statusCode).json(responsePayload);
}
