import styled from "styled-components";
import { useEffect } from "react";
import { supabase } from "../utils/client";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { useGetReposQuery } from "../services/mainApi";
import { setLogin, setAvatar, resetLogin } from "../app/userSlice";

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
		await supabase.auth.signIn(
			{ provider: "github" },
			{
				scopes: "repo gist notifications",
			}
		);
	}

	async function signOut() {
		await supabase.auth.signOut();
		await dispatch(resetLogin());
	}

	const { data } = useGetReposQuery({
		username: loginUser.login,
	});

	if (loginUser.login) {
		return (
			<>
				<LoginWrapper>
					<RepoBox>
						<UserData>
							<UserImage src={loginUser.avatar_url}></UserImage>
							<UserText>
								<strong>{loginUser.login}</strong>
							</UserText>
							<UserText>Please Select a repo</UserText>
						</UserData>
						<ItemBox>
							{data?.map((repo) => (
								<RepoItem
									key={repo.id}
									onClick={() => {
										localStorage.setItem("repo", repo.name);
										navigate("/issues");
									}}
								>
									{repo.name}
								</RepoItem>
							))}
						</ItemBox>
					</RepoBox>
				</LoginWrapper>
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

const RepoBox = styled.div`
	width: 300px;
	height: 400px;
	border: 2px solid #24292f;
	border-radius: 24px;
	margin-top: 24px;
	margin-bottom: 24px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 12px;
`;

const UserData = styled.div`
	width: auto;
	height: auto;
`;

const UserImage = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 100%;
	margin: auto;
`;

const UserText = styled.p`
	width: 100%;
	font-size: 14px;
	text-align: center;
`;

const ItemBox = styled.div`
	width: auto;
	height: 250px;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const RepoItem = styled.button`
	width: 220px;
	height: 50px;
	background-color: #eee;
	border-radius: 6px;
	margin-top: 6px;
	text-align: center;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	:hover {
		color: #fff;
		background-color: #24292f;
	}
`;

const LoginWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	height: auto;
	min-height: 250px;
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
	margin: auto;
	:hover {
		color: white;
		background-color: #27292f;
	}
`;
