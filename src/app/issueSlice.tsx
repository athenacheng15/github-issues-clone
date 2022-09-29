import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IssueQueryStringState {
	issueStatus?: string;
	labels?: string[];
	assignee?: string;
	sort?: string;
}

const initialState: IssueQueryStringState = {
	issueStatus: "",
	labels: [],
	assignee: "",
	sort: "",
};

const issueQueryStringSlice = createSlice({
	name: "queries",
	initialState,
	reducers: {
		handelIssueStatus: (state, action: PayloadAction<string>) => {
			state.issueStatus = action.payload;
		},
		addLabelQuery: (state, action: PayloadAction<string>) => {
			state.labels?.push(action.payload);
		},
		handelAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = action.payload;
		},
		handelSort: (state, action: PayloadAction<string>) => {
			state.sort = action.payload;
		},
	},
});

export const { handelIssueStatus, addLabelQuery, handelAssignee, handelSort } =
	issueQueryStringSlice.actions;
export default issueQueryStringSlice.reducer;
