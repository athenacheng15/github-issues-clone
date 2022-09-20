import styled from "styled-components";
import { useState, useEffect } from "react";
import { supabase } from "../client";

export default function LoginBtn() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		checkUser();
		window.addEventListener("hashchange", () => checkUser());
	}, []);

	async function checkUser() {
		const user = supabase.auth.user();
		const session = supabase.auth.session();
		setUser(user);
	}

	async function signInWithGithub() {
		await supabase.auth.signIn({ provider: "github" });
	}

	async function signOut() {
		await supabase.auth.signOut();
		setUser(null);
	}

	console.log(user);

	if (user) {
		return (
			<>
				<UserText>Hello {user.email}</UserText>
				<UserImage src={user.user_metadata.avatar_url}></UserImage>
				<Login onClick={signOut}>Sign out</Login>
			</>
		);
	}

	return (
		<>
			<UserText>Heyyyy</UserText>
			<Login onClick={signInWithGithub}>Click me to login.</Login>
		</>
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

const Login = styled.button`
	width: auto;
	height: 50px;
	background-color: black;
	color: aliceblue;
	padding: 10px;
	font-size: 24px;
	margin: auto;
	margin-top: 10px;
	margin-left: 50px;
	cursor: pointer;
	border-radius: 10px;
	display: block;
`;
