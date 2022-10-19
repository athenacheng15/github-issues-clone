/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export interface IssueQueryStringState {
	issuesNum?: number;
	issueStatus?: string;
	labels?: string[];
	assignee?: string;
	sort?: string;
	filters?: string;
	page: number;
}

const initialState: IssueQueryStringState = {
	issuesNum: 0,
	issueStatus: "open",
	labels: [],
	assignee: "",
	sort: "",
	filters: "",
	page: 1,
};

const issueQueryStringSlice = createSlice({
	name: "queries",
	initialState,
	reducers: {
		handleIssuesNum: (state, action: PayloadAction<number>) => {
			state.issuesNum = action.payload;
		},
		handleIssueStatus: (state, action: PayloadAction<string>) => {
			state.issueStatus = action.payload;
		},
		handleLabelQuery: (state, action: PayloadAction<string>) => {
			state.labels?.includes(action.payload)
				? _.remove(state.labels, (item) => {
						return item === action.payload;
				  })
				: state.labels?.push(action.payload);
		},
		cleanLabelQuery: (state) => {
			state.labels = [];
		},
		handleAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = action.payload;
		},
		handleSort: (state, action: PayloadAction<string>) => {
			state.sort = action.payload;
		},
		handleFilters: (state, action: PayloadAction<string>) => {
			state.filters = action.payload;
		},
		nextPage: (state) => {
			state.page += 1;
		},
		prevPage: (state) => {
			state.page > 1 ? (state.page -= 1) : state.page;
		},

		resetQuery: () => initialState,
	},
});

export const {
	handleIssuesNum,
	handleIssueStatus,
	handleLabelQuery,
	cleanLabelQuery,
	handleAssignee,
	handleSort,
	handleFilters,
	nextPage,
	prevPage,
	resetQuery,
} = issueQueryStringSlice.actions;
export default issueQueryStringSlice.reducer;
