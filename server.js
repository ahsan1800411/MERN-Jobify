import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';
import notFoundMiddleware from './middlewares/not-found.js';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import xss from 'xss-clean';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
//  routes;

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// middlewares

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Database connected');
    app.listen(port, () => console.log(`Server is up and running on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
