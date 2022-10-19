import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../services/mainApi";
import issueQueryStringSlice from "./issuesSlice";
import newIssueContentSlice from "./newIssueSlice";
import loginSlice from "./userSlice";
import issueSlice from "./issueSlice";

export const store = configureStore({
	reducer: {
		[mainApi.reducerPath]: mainApi.reducer,
		queries: issueQueryStringSlice,
		contents: newIssueContentSlice,
		login: loginSlice,
		issue: issueSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
