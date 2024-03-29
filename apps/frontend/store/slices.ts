import { StateCreator } from 'zustand';

export interface ContentSlice {
  content: string;
  setContent: (content: string) => void;
}
export const createContentSlice: StateCreator<ContentSlice, [], [], ContentSlice> = (set) => ({
  content: '',
  setContent: (content: string) => set({ content }),
});
