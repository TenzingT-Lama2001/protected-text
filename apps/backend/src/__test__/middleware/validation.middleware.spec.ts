import validateSchema from '@middleware/validation.middleware';
import { notesPostSchema } from '@schema/note.schema';
import { ValidationError } from '@src/error/validation.error';
import { Request, Response } from 'express';

describe('validateSchema', () => {
  it('should call next when there are no validation errors', async () => {
    const req = {
      body: { note: 'encryptedNote', hash: 'hash', noteId: 'site' },
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn();
    await validateSchema(notesPostSchema)(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('should call next with a ValidationError when there are validation errors', async () => {
    const req = {
      body: { note: 'encryptedNote', hash: 'hash' },
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn();
    await validateSchema(notesPostSchema)(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });
});
