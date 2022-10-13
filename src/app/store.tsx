import { configureStore } from "@reduxjs/toolkit";
import { labelsApi } from "../services/labelsApi";
import issueQueryStringSlice from "./issuesSlice";
import newIssueContentSlice from "./newIssueSlice";
import loginSlice from "./userSlice";
import issueSlice from "./issueSlice";

export const store = configureStore({
	reducer: {
		[labelsApi.reducerPath]: labelsApi.reducer,
		queries: issueQueryStringSlice,
		contents: newIssueContentSlice,
		login: loginSlice,
		issue: issueSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(labelsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
