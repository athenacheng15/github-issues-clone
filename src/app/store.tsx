import { configureStore } from "@reduxjs/toolkit";
import { labelsApi } from "../services/labelsApi";
import issueQueryStringSlice from "./issueSlice";
import newIssueContentSlice from "./newIssueSlice";

export const store = configureStore({
	reducer: {
		[labelsApi.reducerPath]: labelsApi.reducer,
		queries: issueQueryStringSlice,
		contents: newIssueContentSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(labelsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
