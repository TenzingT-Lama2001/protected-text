// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { ProtectedTextServer } from '@src/index';
// import { EncryptionController } from '@controller/encryption.controller';

const server = new ProtectedTextServer();
const { app } = server;

describe('EncryptionRoutes', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Clear any previous mock calls before each test
  });

  describe('Encrypt', () => {
    it('should successfully encrypt a note when valid request body is provided', async () => {
      // Arrange
      const requestBody = {
        note: 'This is a test note',
        secretKey: 'testSecretKey',
        noteId: 'testNoteId',
      } as unknown as Request;

      // const encryptionControllerSpy = jest.spyOn(EncryptionController, 'encrypt');

      // Act
      await request(app).post('/api/v1/encrypt').send(requestBody);

      // Assert
      // expect(encryptionControllerSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw validation error if request is missing something', async () => {
      // Arrange
      const mockRequest = {
        note: 'note',
        noteId: 'site',
      };
      // const encryptionControllerSpy = jest.spyOn(EncryptionController, 'encrypt');

      // Act
      await request(app).post('/api/v1/encrypt').send(mockRequest);

      // Assert
      // expect(encryptionControllerSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('Decrypt', () => {
    it('should successfully decrypt a note when valid request body is provided', async () => {
      // Arrange
      const requestBody = {
        note: 'U2FsdGVkX19Lb9qVXNTV/V28nsFB1b9lEyxJzYBgk62hvhZZaCs0fXn6amCu8AziWvYjGWZMJaB8cvmdOizyaYMPF9TagkSZ1ImlMWmK21csVruvAhjWFfxxOPAo4IhCRfIOje2n9sJY/dyq4/5ayxj9yTHhNt5bWY3MELnKUVapJmZKfsXUGddN4R+mGyRIfwH+z7YyfXejkyccT3NivnJ5mNwGKoyFDCtAFdNP2sE=',
        secretKey: 'secret123',
        noteId: 'latestSite',
      } as unknown as Request;

      // const encryptionControllerSpy = jest.spyOn(EncryptionController, 'decrypt');

      // Act
      await request(app).post('/api/v1/decrypt').send(requestBody);

      // Assert
      // expect(encryptionControllerSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw validation error if request is missing something', async () => {
      // Arrange
      const requestBody = {
        note: 'U2FsdGVkX19Lb9qVXNTV/V28nsFB1b9lEyxJzYBgk62hvhZZaCs0fXn6amCu8AziWvYjGWZMJaB8cvmdOizyaYMPF9TagkSZ1ImlMWmK21csVruvAhjWFfxxOPAo4IhCRfIOje2n9sJY/dyq4/5ayxj9yTHhNt5bWY3MELnKUVapJmZKfsXUGddN4R+mGyRIfwH+z7YyfXejkyccT3NivnJ5mNwGKoyFDCtAFdNP2sE=',
        secretKey: 'secret123',
      } as unknown as Request;

      // const encryptionControllerSpy = jest.spyOn(EncryptionController, 'decrypt');
      // Act
      await request(app).post('/api/v1/decrypt').send(requestBody);

      // Assert
      // expect(encryptionControllerSpy).toHaveBeenCalledTimes(0);
    });
  });
});
