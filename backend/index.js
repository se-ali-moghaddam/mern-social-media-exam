import express from 'express';
import dbConnect from './config/db/dbConnect.js';
import dotenv from 'dotenv';

dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`The server is running on port(${PORT}) :)`));