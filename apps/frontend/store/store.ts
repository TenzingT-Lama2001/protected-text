import { create } from 'zustand';
// import zukeeper from 'zukeeper';
// import { ContentSlice, createContentSlice } from './slices';

// export const useStore = create<ContentSlice>(
//   zukeeper((...a) => ({
//     ...createContentSlice(...a),
//   })),
// );

// export const useBoundStore = create<ContentSlice>()((...a) => ({
//   ...createContentSlice(...a),
// }));

// make content store and use zukeeper

// export const useContentStore = create<ContentState>((set) => ({
//   content: '',
//   setContent: (content: string) => {
//     set((state) => ({ ...state, content }));
//   },
// }));

// window.store = useContentStore;

// export const useContentStore = create<ContentState>()((set) => ({
//   content: '',
//   setContent: (content: string) => {
//     set({ content });
//     console.log('🚀 ~ file: store.ts:14 ~ content:', content);
//   },
// }));

// use zukeeper to create useContentStore with proper type safety for set function and all
export interface ContentState {
  content: string;
  contentHash: string;
  secretKey: string;
  setSecretKey: (secretKey: string) => void;
  setContent: (content: string) => void;
  setContentHash: (contentHash: string) => void;
}

export interface InitializeState {
  initialize: boolean;
  setInitialize: (initialize: boolean) => void;
  isNew: boolean;
  setIsNew: (isNew: boolean) => void;
}
// export const useContentStore = create<ContentState>(
//   zukeeper((set: any) => ({
//     content: '',
//     setContent: (newContent: string) => {
//       set({ content: newContent });
//     },
//     contentHash: '',
//     setContentHash: (contentHash: string) => {
//       set({ contentHash });
//     },
//   })),
// );
export const useContentStore = create<ContentState>((set) => ({
  content: '',
  setContent: (newContent: string) => {
    set({ content: newContent });
  },
  contentHash: '',
  setContentHash: (contentHash: string) => {
    set({ contentHash });
  },
  secretKey: '',
  setSecretKey: (secretKey: string) => {
    set({ secretKey });
  },
}));
export const useInitializeStore = create<InitializeState>((set) => ({
  initialize: false,
  setInitialize: (initialize: boolean) => {
    set({ initialize });
  },
  isNew: true,
  setIsNew: (isNew: boolean) => {
    set({ isNew });
  },
}));

// declare global {
//   interface Window {
//     store: any;
//   }
// }

// window.store = useContentStore;
