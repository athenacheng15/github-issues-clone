/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export interface IssueQueryStringState {
	issueStatus?: string;
	labels?: string[];
	assignee?: string;
	sort?: string;
	filters?: string;
}

const initialState: IssueQueryStringState = {
	issueStatus: "",
	labels: [],
	assignee: "",
	sort: "",
	filters: "",
};

const issueQueryStringSlice = createSlice({
	name: "queries",
	initialState,
	reducers: {
		handelIssueStatus: (state, action: PayloadAction<string>) => {
			state.issueStatus = action.payload;
		},
		handleLabelQuery: (state, action: PayloadAction<string>) => {
			state.labels?.includes(action.payload)
				? _.remove(state.labels, (item) => {
						return item === action.payload;
				  })
				: state.labels?.push(action.payload);
		},
		handelAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = action.payload;
		},
		handelSort: (state, action: PayloadAction<string>) => {
			state.sort = action.payload;
		},
		handelFilters: (state, action: PayloadAction<string>) => {
			state.filters = action.payload;
		},
	},
});

export const {
	handelIssueStatus,
	handleLabelQuery,
	handelAssignee,
	handelSort,
	handelFilters,
} = issueQueryStringSlice.actions;
export default issueQueryStringSlice.reducer;
