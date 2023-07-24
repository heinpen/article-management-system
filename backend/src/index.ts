import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import { errorMiddleware } from './api/middleware/errorHandler';
import routers from './api/routes';
import { parseRSSAndSaveToDB } from './api/services/posts/rssParser';

const swaggerDocument = yaml.load('openapi.yaml');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const URL = process.env.URL;

if (!URL) throw new Error('MongoDB connection URL is missing');

// Middleware
app.use(cors({ credentials: true, origin: 'https://article-management-system-blbk.vercel.app' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1', routers);
app.use(errorMiddleware);

mongoose
  .connect(URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

cron.schedule('0 0 * * *', () => {
  console.log('Parsing RSS feed...');
  parseRSSAndSaveToDB();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
