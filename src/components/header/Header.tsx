import styled from "styled-components";
import { useState, Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import {
	MarkGithubIcon,
	TriangleDownIcon,
	PlusIcon,
	BellIcon,
	ThreeBarsIcon,
	SignOutIcon,
} from "@primer/octicons-react";
import SearchBar from "./SearchBar";
import SelectList from "../commons/dropdown/SelectList";
import UserSelectList from "./UserSelectList";

interface Props {
	isShown: boolean;
}

export default function Header() {
	const [mobileState, setMobileState] = useState(false);
	const [plusBtnState, setPlusBtnState] = useState(false);
	const [userBtnState, setUserBtnState] = useState(false);
	const user = useSelector((state: RootState) => state.login);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<Wapper>
				<HamburgerBox onClick={() => setMobileState(!mobileState)}>
					<HamburgerBtn fill="#FFFFFF" size={24} />
				</HamburgerBox>
				<MarkGithubIcon fill="#FFFFFF" size="medium" />
				<GrowBox>
					<SearchBar width="272px" max="500px" />
					<LinkBox>
						{linkList.map((item, index) => (
							<HeaderLink key={index}>{item}</HeaderLink>
						))}
					</LinkBox>
				</GrowBox>
				<HeaderBox>
					<BellBtn fill="#FFFFFF" size={16} />
					<ArrowList
						onClick={() => {
							setPlusBtnState(!plusBtnState);
							setUserBtnState(false);
						}}
					>
						<PlusBtn fill="#FFFFFF" />
						<TriangleBtn fill="#FFFFFF" size="small" />
						<SelectList
							right="88px"
							top="48px"
							listitems={plusListitems}
							isShown={plusBtnState}
						/>
					</ArrowList>

					<ArrowList
						onClick={() => {
							setUserBtnState(!userBtnState);
							setPlusBtnState(false);
						}}
					>
						<UserImage>
							<Avatar src={user.avatar_url} />
						</UserImage>
						<TriangleBtn fill="#FFFFFF" size="small" />
						<UserSelectList
							right="35px"
							top="48px"
							isShown={userBtnState}
							user={user}
						/>
					</ArrowList>
				</HeaderBox>
			</Wapper>
			<MoboleHeaderBox isShown={mobileState}>
				<SearchBar width="100%" max="" />
				<MobileLinkBox>
					{mobileLinkList.map((item, index) => (
						<MobileHeaderLink key={index}>{item}</MobileHeaderLink>
					))}
					<MobileHeaderLink>
						<MobileUserImg />
						{`user name`}
					</MobileHeaderLink>
					<MobileHeaderLink>
						<SignOutBox>
							<SignOutIcon fill="#FFFFFF" />
						</SignOutBox>
						Sign out
					</MobileHeaderLink>
				</MobileLinkBox>
			</MoboleHeaderBox>
		</>
	);
}

const linkList = ["Pull requests", "Issues", "Marketplace", "Explore", "Pulls"];
const mobileLinkList = [
	"Dashboard",
	"Pull requests",
	"Issues",
	"Codespaces",
	"Marketplace",
	"Explore",
	"Sponsors",
	"Settings",
];

const plusListitems = [
	"New repository",
	"Import repository",
	"New gist",
	"New organization",
];

const Wapper = styled.div`
	position: relative;
	width: 100%;
	height: 62px;
	padding: 16px 32px;
	background-color: rgb(36, 41, 47);
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: 767px) {
		padding: 16px 16px;
	}
`;

const HeaderBox = styled.div`
	display: flex;
	align-items: center;
	width: auto;
	height: auto;
`;

const GrowBox = styled(HeaderBox)`
	flex-grow: 1;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const HamburgerBox = styled.div`
	display: none;
	cursor: pointer;
	@media screen and (max-width: 767px) {
		display: initial;
	}
`;

const HamburgerBtn = styled(ThreeBarsIcon)`
	:hover {
		fill: #cccccc;
	}
`;

const LinkBox = styled.div`
	width: auto;
	height: auto;
	display: flex;
	align-items: center;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const HeaderLink = styled.a`
	color: white;
	font-weight: 600;
	font-size: 14px;
	margin-right: 16px;
	cursor: pointer;
	display: flex;
	:hover {
		color: rgb(209, 213, 218);
	}
	:last-child {
		display: none;
	}
	@media screen and (max-width: 1011px) {
		:last-child {
			display: initial;
			order: -1;
		}
		:first-child {
			display: none;
		}
	}
`;

const ArrowList = styled.button`
	display: flex;
	width: auto;
	height: auto;
	padding-left: 16px;
	align-items: center;
	background-color: transparent;
	border: none;
	cursor: pointer;
	:hover {
		fill: #cccccc;
	}
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const BellBtn = styled(BellIcon)`
	background-color: transparent;
	border: none;
	cursor: pointer;
	:hover {
		fill: #cccccc;
	}
`;

const PlusBtn = styled(PlusIcon)`
	background-color: transparent;
	border: none;

	${ArrowList}:hover & {
		fill: #cccccc;
	}
`;

const TriangleBtn = styled(TriangleDownIcon)`
	${ArrowList}:hover & {
		fill: #cccccc;
	}
`;

const UserImage = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: azure;
`;

const Avatar = styled.img`
	display: ${(props) => (props.src === "" ? "none" : "initial")};
	border-radius: 100%;
`;

const MoboleHeaderBox = styled.div`
	width: 100%;
	height: auto;
	display: none;
	background-color: rgb(36, 41, 47);
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	@media screen and (max-width: 767px) {
		display: ${(props: Props) => (props.isShown ? "flex" : "none")};
	}
`;

const MobileLinkBox = styled.div`
	width: 100%;
	height: auto;
	padding: 16px;
`;

const MobileHeaderLink = styled.button`
	color: white;
	font-weight: 600;
	font-size: 14px;
	padding: 8px 0;
	width: 100%;
	line-height: 21px;
	border-top: solid 1px rgb(87, 96, 106);
	display: flex;
	align-items: center;
	cursor: pointer;
	:hover {
		color: rgb(209, 213, 218);
	}
`;

const SignOutBox = styled.div`
	margin-right: 5px;
	width: auto;
	height: auto;
`;

const MobileUserImg = styled.div`
	position: relative;
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: azure;
	margin-right: 5px;
`;
