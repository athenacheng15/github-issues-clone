/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export interface IssueState {
	title?: string;
	body?: string;
	state?: string;
	stateReason?: string;
	labels?: string[];
	assignees?: string[];
}

const initialState: IssueState = {
	labels: [],
	assignees: [],
};

const issueSlice = createSlice({
	name: "issue",
	initialState,
	reducers: {
		handleIssueState: (state, action: PayloadAction<string>) => {
			state.state = action.payload;
		},
		handleIssueStateReason: (state, action: PayloadAction<string>) => {
			state.stateReason = action.payload;
		},
		handleTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		handleIssueBody: (state, action: PayloadAction<string | undefined>) => {
			state.body = action.payload;
		},
		setDefaultLabels: (state, action: PayloadAction<string[]>) => {
			state.labels = action.payload;
		},

		handleLabels: (state, action: PayloadAction<string>) => {
			state.labels?.includes(action.payload)
				? _.remove(state.labels, (item) => {
						return item === action.payload;
				  })
				: state.labels?.push(action.payload);
		},
		setDefaultAssignees: (state, action: PayloadAction<string[]>) => {
			state.assignees = action.payload;
		},

		handleAssignees: (state, action: PayloadAction<string>) => {
			state.assignees?.includes(action.payload)
				? _.remove(state.assignees, (item) => {
						return item === action.payload;
				  })
				: state.assignees?.push(action.payload);
		},
		resetAssignees: (state) => {
			state.assignees = [];
		},

		resetAll: () => initialState,
	},
});

export const {
	handleIssueState,
	handleIssueStateReason,
	handleTitle,
	handleIssueBody,
	setDefaultLabels,
	handleLabels,
	setDefaultAssignees,
	handleAssignees,
	resetAssignees,
	resetAll,
} = issueSlice.actions;
export default issueSlice.reducer;
