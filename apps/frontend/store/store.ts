import { create } from 'zustand';
import { ContentSlice, createContentSlice } from './slices';

export const useBoundStore = create<ContentSlice>()((...a) => ({
  ...createContentSlice(...a),
}));
