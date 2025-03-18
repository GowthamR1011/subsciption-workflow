const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {...error};
        error.message = err.message;
        console.log(err);

        // Mongoose bad ObjectId
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new ErrorResponse(message, 404);
        }

        // Mongoose duplicate key
        if(err.code === 11000){
            const message = 'Duplicate field value entered';
            error = new ErrorResponse(message, 400);
        }

        // Mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorResponse(message.join(", "), 400);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
    catch(error){
        next(error);
    }
};

export default errorMiddleware;