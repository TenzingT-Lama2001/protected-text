import { Request, Response } from 'express';
import { Document } from 'mongoose';

export interface INote {
  id: string;
  note: string;
  hash: string;
}
export interface INoteDocument extends INote, Document {
  id: string;
}

export interface INoteController {
  getNote(_req: Request, _res: Response): Promise<void>;
  postNote(_req: Request, _res: Response): Promise<void>;
  deleteNote(_req: Request, _res: Response): Promise<void>;
  updateNote(_req: Request, _res: Response): Promise<void>;
}

export interface INoteService {
  getNote(_id: string): Promise<void>;
  postNote(_note: string): Promise<void>;
  deleteNote(_id: string): Promise<void>;
  updateNote(_id: string): Promise<void>;
}

export type TGetNote = Promise<INoteDocument | null>;
export type TPostNote = Promise<INoteDocument>;
export type TDeleteNote = Promise<void | null>;
export type TUpdateNote = Promise<INoteDocument | null>;
