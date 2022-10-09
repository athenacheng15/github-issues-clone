import styled from "styled-components";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "../utils/client";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import {
	setLogin,
	setAvatar,
	setOwner,
	setRepo,
	resetLogin,
} from "../app/userSlice";

export default function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginUser = useSelector((state: RootState) => state.login);

	useEffect(() => {
		checkUser();
		window.addEventListener("hashchange", () => checkUser());
	}, []);

	async function checkUser() {
		const user = supabase.auth.user();
		const session = supabase.auth.session();
		dispatch(setLogin(user?.user_metadata.user_name));
		dispatch(setAvatar(user?.user_metadata.avatar_url));
	}

	async function signInWithGithub() {
		await supabase.auth.signIn({ provider: "github" });
	}

	async function signOut() {
		await supabase.auth.signOut();
		await dispatch(resetLogin());
	}

	console.log(loginUser);

	if (loginUser.login) {
		return (
			<>
				<UserText>Hello {loginUser.login}</UserText>
				<UserImage src={loginUser.avatar_url}></UserImage>
				<Login onClick={signOut}>Sign out</Login>
			</>
		);
	}

	return (
		<LoginWrapper>
			<Login
				onClick={() => {
					signInWithGithub();
				}}
			>
				Click here to login.
			</Login>
		</LoginWrapper>
	);
}

const UserImage = styled.img`
	width: 180px;
	height: 180px;
	margin-left: 50px;
	border-radius: 25px;
`;

const UserText = styled.p`
	margin-top: 200px;
	font-size: 20px;
	margin-left: 50px;
`;

const LoginWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
`;

const Login = styled.button`
	width: auto;
	height: 50px;
	background-color: white;
	color: #27292f;
	padding: 10px;
	font-size: 24px;
	border: 2px solid #27292f;
	cursor: pointer;
	border-radius: 10px;
	display: flex;
	align-items: center;
	:hover {
		color: white;
		background-color: #27292f;
	}
`;
