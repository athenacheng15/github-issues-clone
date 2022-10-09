import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

const loginState =
	localStorage.getItem("supabase.auth.token") &&
	JSON.parse(localStorage.getItem("supabase.auth.token") || "");

export interface LoginState {
	login: string | null;
	avatar_url: string;
	owner: string;
	repo: string;
}

const initialState: LoginState = {
	login: loginState
		? loginState.currentSession.user.user_metadata.user_name
		: "",
	avatar_url: loginState
		? loginState.currentSession.user.user_metadata.avatar_url
		: "",
	owner: "",
	repo: "",
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<string>) => {
			state.login = action.payload;
		},
		setAvatar: (state, action: PayloadAction<string>) => {
			state.avatar_url = action.payload;
		},
		setOwner: (state, action: PayloadAction<string>) => {
			state.owner = action.payload;
		},
		setRepo: (state, action: PayloadAction<string>) => {
			state.repo = action.payload;
		},
		resetLogin: (state) => {
			state.login = "";
			state.avatar_url = "";
		},
	},
});

export const { setLogin, setAvatar, setOwner, setRepo, resetLogin } =
	loginSlice.actions;
export default loginSlice.reducer;
