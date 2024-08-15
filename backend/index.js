import express from 'express';
import dbConnect from './config/db/dbConnect.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/error/errorHandler.js';

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser());
app.use(userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`The server is running on port(${PORT}) :)`));