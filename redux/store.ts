import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/redux/slice/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// ✅ Types for dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
