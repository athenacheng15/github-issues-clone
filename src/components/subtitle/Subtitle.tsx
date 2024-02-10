import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import SingleOutlineBtn from "./SingleOutlineBtn";
import DoubleOutlineBtn from "./DoubleOutlineBtn";
import FilledBtn from "./FilledBtn";
import { resetQuery } from "../../app/issuesSlice";
import {
	RepoIcon,
	PinIcon,
	EyeIcon,
	RepoForkedIcon,
	StarIcon,
	CodeIcon,
	IssueOpenedIcon,
	GitPullRequestIcon,
	PlayIcon,
	TableIcon,
	BookIcon,
	ShieldIcon,
	GraphIcon,
	GearIcon,
} from "@primer/octicons-react";

export default function SubTitle() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginUser = useSelector((state: RootState) => state.login);
	const issuesNum = useSelector((state: RootState) => state.queries.issuesNum);

	const fillBtnList = [
		{ icon: <CodeIcon fill="#57606a" />, text: "Code" },
		{
			icon: <IssueOpenedIcon fill="#57606a" />,
			text: "Issues",
			dotDisplay: true,
			num: issuesNum,
			action: () => navigate("/issues"),
		},
		{ icon: <GitPullRequestIcon fill="#57606a" />, text: "Pull requests" },
		{ icon: <PlayIcon fill="#57606a" />, text: "Actions" },
		{ icon: <TableIcon fill="#57606a" />, text: "Projects" },
		{ icon: <BookIcon fill="#57606a" />, text: "Wiki" },
		{ icon: <ShieldIcon fill="#57606a" />, text: "Security" },
		{ icon: <GraphIcon fill="#57606a" />, text: "Insights" },
		{ icon: <GearIcon fill="#57606a" />, text: "Settings" },
	];

	return (
		<>
			<Wrapper isShown={loginUser.login ? true : false}>
				<UpperBox>
					<TitleBox>
						<RepoIcon size={16} fill="rgb(87, 96, 106)" />
						<UserName
							onClick={() => {
								dispatch(resetQuery());
								navigate("/");
								localStorage.removeItem("repo");
							}}
						>
							{loginUser.login ? loginUser.login : "User Name"}
						</UserName>
						<span>/</span>
						<RepoName>
							{localStorage.getItem("repo")
								? localStorage.getItem("repo")
								: "Repo Name"}
						</RepoName>
						<LabelBtn>Public</LabelBtn>
					</TitleBox>
					<OutLineBtnBox>
						<SingleOutlineBtn
							icon={<PinIcon fill="#57606a" />}
							btnText="Unpin"
						/>
						<SingleOutlineBtn
							icon={<EyeIcon fill="#57606a" />}
							btnText="Unwatch"
							dotDisplay={true}
							triangleDisplay={true}
							num={1}
						/>
						<DoubleOutlineBtn
							icon={<RepoForkedIcon fill="#57606a" />}
							btnText="Fork"
							dotDisplay={true}
							num={0}
						/>
						<DoubleOutlineBtn
							icon={<StarIcon fill="#57606a" />}
							btnText="Star"
							dotDisplay={true}
							num={0}
						/>
					</OutLineBtnBox>
				</UpperBox>
				<ButtomBox>
					{fillBtnList.map((item) => (
						<FilledBtn
							key={item.text}
							icon={item.icon}
							btnText={item.text}
							dotDisplay={item.dotDisplay}
							num={item.num}
							isActive={item.text === "Issues"}
							onClick={item.action}
						/>
					))}
				</ButtomBox>
			</Wrapper>
		</>
	);
}

interface WrapperProps {
	isShown: boolean;
}

const Wrapper = styled.div<WrapperProps>`
	position: relative;
	display: ${(props) => (props.isShown ? "block" : "none")};
	width: 100%;
	height: auto;
	background-color: #f6f8fa;
	font-weight: 400;
	padding: 16px 32px 0 32px;
	border-bottom: solid 1px #d1d5da;
	font-size: 20px;
	@media screen and (max-width: 1011px) {
		padding: 16px 16px 0px 16px;
	}
`;

const UpperBox = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 16px;
`;

const ButtomBox = styled.div`
	width: auto;
	height: auto;
	display: flex;
	bottom: 0;
	overflow-x: scroll;
	overflow-y: hidden;
	::-webkit-scrollbar {
		/* margin-top: 20px; */
	}
	& > *:not(:first-child) {
		margin-left: 8px;
	}
`;

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	width: auto;
	height: 30px;
	color: #57606a;
	margin-right: 82px;
	& > *:first-child {
		margin-right: 8px;
	}
	& > *:last-child {
		margin-left: 8px;
	}
`;

const UserName = styled.button`
	color: #0969da;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
	@media screen and (max-width: 767px) {
		font-size: 18px;
	}
`;

const RepoName = styled.a`
	color: #0969da;
	font-weight: 600;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
	@media screen and (max-width: 767px) {
		font-size: 18px;
	}
`;

const LabelBtn = styled.button`
	width: auto;
	height: 20px;
	font-size: 12px;
	font-weight: 500;
	border-radius: 10px;
	padding: 0 8px;
	text-align: center;
	border: solid 1px #d0d7de;
	color: #57606a;
`;

const OutLineBtnBox = styled.div`
	width: auto;
	height: auto;
	display: flex;
	margin-left: auto;

	& > *:not(:first-child) {
		margin-left: 8px;
	}
	@media screen and (max-width: 928px) {
		margin-top: 20px;
	}
	@media screen and (max-width: 767px) {
		display: none;
	}
`;
