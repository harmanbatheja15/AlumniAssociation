import { create } from 'zustand';
import { createAppSlice } from './slices/app';
import { devtools } from 'zustand/middleware';

export const useStore = create(
    devtools((set) => ({
        ...createAppSlice(set),
    }))
);
