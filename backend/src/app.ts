require('dotenv').config()
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import errorHandler from './middlewares/error-handler';
import routes from './routes';
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(process.env.DB_ADDRESS ?? 'testServer');
app.use(cors({
  origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
