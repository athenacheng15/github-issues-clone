/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import Labels from "../components/labels/Labels";

export interface NewIssueContent {
	title: string;
	body: string;
	assignees: string[];
	labels: string[];
}

const initialState: NewIssueContent = {
	title: "",
	body: "",
	assignees: [],
	labels: [],
};

const newIssueContentSlice = createSlice({
	name: "content",
	initialState,
	reducers: {
		handleTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		handleBody: (state, action: PayloadAction<string>) => {
			state.body = action.payload;
		},
		handleLabels: (state, action: PayloadAction<string>) => {
			state.labels.includes(action.payload)
				? _.remove(state.labels, (item) => {
						return item === action.payload;
				  })
				: state.labels.push(action.payload);
		},
		handleAssignees: (state, action: PayloadAction<string>) => {
			state.assignees.includes(action.payload)
				? _.remove(state.assignees, (item) => {
						return item === action.payload;
				  })
				: state.assignees.push(action.payload);
		},
	},
});

export const { handleTitle, handleBody, handleLabels, handleAssignees } =
	newIssueContentSlice.actions;
export default newIssueContentSlice.reducer;
