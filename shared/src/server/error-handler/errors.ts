class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: unknown;

    constructor(
        message: string,
        statusCode: number,
        isOperational: boolean = true,
        details?: unknown
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;

        // Maintains proper stack trace for where error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}
// Rate Limiting Erorr
class RateLimitError extends AppError{
    constructor(message:string = "Too many request ,please try again later"){
        super(message, 429)
    }
}

// Not Found Error
class NotFoundError extends AppError{
    constructor(message:string="Resource Not Found",details?:any){
        super(message,404,true,details);
    }
}

// Authentication Error
class AuthenticationError extends AppError{
    constructor(message:string="Authentication Failed",details?:any){
        super(message,401,true,details);
    }
}

// Authorization Error
class AuthorizationError extends AppError{
    constructor(message:string = "Forbidden", details?:any){
        super(message,403,true,details)
    }
}

// Validation error -> for zod schema validation errors
class ValidationError extends AppError{
    constructor(message:string="Validation Error",details?:any){
        super(message,400,true,details);
    }
}

// Database Error
class DatabaseError extends AppError{
    constructor(message:string="Database Error" , details :any){
        super(message, 500, true, details)
    }
}


export {
    AppError,
    NotFoundError,
    AuthenticationError,
    AuthorizationError,
    DatabaseError, 
    ValidationError,
    RateLimitError
}