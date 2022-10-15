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
	page: number;
}

const initialState: IssueQueryStringState = {
	issueStatus: "",
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

		resetQuery: (state) => {
			state.issueStatus = "";
			state.labels = [];
			state.assignee = "";
			state.sort = "";
			state.filters = "";
			state.page = 1;
		},
	},
});

export const {
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