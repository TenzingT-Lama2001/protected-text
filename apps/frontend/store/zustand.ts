import { create } from 'zustand';

interface ContentState {
  content: string;
  setContent: (content: string) => void;
}

const useContentStore = create<ContentState>((set) => ({
  content: '', // Initial content is empty
  setContent: (content) => set({ content }), // Action to set content
}));

export default useContentStore;
