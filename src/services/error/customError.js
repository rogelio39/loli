export default class CustomError{
    static createError({nombre="Error", cause, message, code=1}){
        const error = new Error(message);
        error.name=nombre;
        error.code=code;
        error.cause = cause ? new Error(cause): null;
        throw error
    }
} 