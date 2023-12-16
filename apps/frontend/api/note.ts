import axios from '../lib/axios';

export type Note = {
  _id: string;
  noteId: string;
  note: string;
  hash: string;
  __v: number;
};

type GetNoteResponse = {
  note: Note;
};

export type PostNote = {
  note: string;
  hash: string;
  noteId: string;
};

export type UpdateNote = {
  note: string;
  previousHash: string;
  hash: string;
};

export const getNote = async (noteId: string) => {
  const { data } = await axios.get<GetNoteResponse>(`/notes/${noteId}`);
  return data;
};

export const postNote = async (payload: PostNote) => {
  const { data } = await axios.post<GetNoteResponse>(`/notes`, payload);
  return data;
};

export const updateNote = async (noteId: string, payload: UpdateNote) => {
  const { data } = await axios.patch<GetNoteResponse>(`/notes/${noteId}`, payload);
  return data;
};
