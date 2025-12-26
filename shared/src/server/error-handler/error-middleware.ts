import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errors.js';
import { ZodError } from 'zod';
import { sendApiResponse } from '../response.js';

// const {JsonWebTokenError, TokenExpiredError} = jwt;
export const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {

	// Handle custom AppError
	if (error instanceof AppError) {
		return sendApiResponse({
			res,
			statusCode: error.statusCode,
			message: error.message,
			error: error.details || undefined
		});
	}

	// Handle Zod validation errors
	if (error instanceof ZodError) {
		const formattedErrors = error.issues.map(err => ({
		field: err.path.join('.'),
		message: err.message
		}));

		return sendApiResponse({
			res,
			statusCode: 400,
			message: "Validation failed",
			error: formattedErrors
		});
	}

	if(error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'){
		return sendApiResponse({
			res,
			statusCode: 400,
			message: "Token Invalid or Expired",
			error: error
		});
	}

	
	// Handle generic errors
	return sendApiResponse({
		res,
		statusCode: 500,
		message: "Internal Server Error",
		error: error.message || error
	});
};
