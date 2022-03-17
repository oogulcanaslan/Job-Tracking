import { configureStore } from '@reduxjs/toolkit';
import joblistReducer from './joblistSlice';

export default configureStore({
	reducer: {
		jobs: joblistReducer,
	},
});
