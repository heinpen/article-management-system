import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routers from './api/routes';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
const swaggerDocument = YAML.load('./openapi.yaml');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const URL = process.env.URL;

if (!URL) throw new Error('MongoDB connection URL is missing');

// Middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1', routers);

mongoose
  .connect(URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
