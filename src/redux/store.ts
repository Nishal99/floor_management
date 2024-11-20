import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from './reducers/tablesReducer';

export interface Table {
  id: string;
  shape: 'square' | 'circle';
  name: string;
  minCovers: number;
  maxCovers: number;
  isActive: boolean;
  position: { x: number; y: number };
  width: number; // Added width
  height: number; // Added height
  rotation?: number; // Added rotation
}



export const store = configureStore({
  reducer: {
    tables: tablesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
