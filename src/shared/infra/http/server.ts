import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

// CUSTOM IMPORTS
import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Middleware to deal with errors, has to be after routes because is in routes that
// occur errors
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Case the error is an custom error that we create return AppError
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // If is not an AppError we just send a generic response error
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
