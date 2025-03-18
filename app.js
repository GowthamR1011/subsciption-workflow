import express from 'express';
import {PORT} from './config/config.js';
import  authRouter  from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subsciption.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: false })); // Body parser
app.use(cookieParser()); // Cookie parser



// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


// Error Middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // Connect to MongoDB
    await connectDB();
    
});

export default app;