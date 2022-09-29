import { configureStore } from "@reduxjs/toolkit";
import { labelsApi } from "../services/labelsApi";
import issueQueryStringReducer from "./issueSlice";

export const store = configureStore({
	reducer: {
		[labelsApi.reducerPath]: labelsApi.reducer,
		queries: issueQueryStringReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(labelsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
