import { errorHandler, notFoundHandler } from '@middleware/errorHandler.middleware';
import { CustomError } from '@src/error/custom.error';
import { ProtectedTextServer } from '@src/index';
import { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

describe('ErrorHandler Middleware', () => {
  const server = new ProtectedTextServer();
  const { app } = server;
  app.use(notFoundHandler);
  app.use(errorHandler);
  describe('notFoundHandler', () => {
    it('should throw error if non existent route is hit', async () => {
      // Arrange
      type TResponseBody = {
        name: string;
        message: string;
      };

      // Act
      const response = await request(app).get('/api/v1/non-existent-route').expect(404);
      const { name, message } = response.body as TResponseBody;

      // Assert
      expect(name).toBe('Error');
      expect(message).toBe('Not found GET /api/v1/non-existent-route');
    });
  });
  describe('errorHandler', () => {
    it('should handle errors and custom errors', () => {
      const error = new Error('Error occurred') as CustomError;
      error.statusCode = 400;
      error.details = [];
      const req = {} as Request;
      const res = {
        status: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
      expect(res.send).toHaveBeenCalledWith({
        name: error.name,
        message: error.message,
        details: error.details,
      });
    });
    it('should send 500 status code if the status code is less than 400', () => {
      const error = new Error('Error occurred') as CustomError;
      error.statusCode = 300;
      error.details = [];
      const req = {} as Request;
      const res = {
        status: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        name: error.name,
        message: error.message,
        details: error.details,
      });
    });
    it('should handle errors and custom errors with cause', () => {
      const error = new Error('Error occurred') as CustomError;
      error.statusCode = 400;
      error.details = [];
      error.cause = 'ERROR';

      const req = {} as Request;
      const res = {
        status: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
      expect(res.send).toHaveBeenCalledWith({
        name: error.name,
        message: error.message,
        details: error.details,
        cause: error.cause,
      });
    });
  });
});
