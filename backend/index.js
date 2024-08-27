import express from 'express';
import dbConnect from './config/db/dbConnect.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import { errorHandler, notFound } from './middleware/error/errorHandler.js';
import cors from 'cors';

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(userRoutes);
app.use(categoryRoutes);
app.use(postRoutes);
app.use(commentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`The server is running on port(${PORT}) :)`));