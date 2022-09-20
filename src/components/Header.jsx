import styled from "styled-components";
import {
	MarkGithubIcon,
	TriangleDownIcon,
	PlusIcon,
	BellIcon,
	ThreeBarsIcon,
} from "@primer/octicons-react";

export default function Header() {
	return (
		<>
			<Wapper>
				<HamburgerBox>
					<HamburgerBtn fill="#FFFFFF" size="medium" />
				</HamburgerBox>
				<HeaderBox>
					<MarkGithubIcon fill="#FFFFFF" size="medium" />

					<SearchBar>
						<SearchInput placeholder="Search or jump to..." />
						<SlashBtn>/</SlashBtn>
					</SearchBar>
					<LinkBox>
						{linkList.map((item, index) => (
							<HeaderLink key={index}>{item}</HeaderLink>
						))}
					</LinkBox>
				</HeaderBox>
				<HeaderBox>
					<BellBtn fill="#FFFFFF" size={16} />
					<ArrowList>
						<PlusBtn fill="#FFFFFF" />
						<TriangleBtn fill="#FFFFFF" size="small" />
					</ArrowList>
					<ArrowList>
						<UserImage />
						<TriangleBtn fill="#FFFFFF" size="small" />
					</ArrowList>
				</HeaderBox>
			</Wapper>
		</>
	);
}

const linkList = ["Pulls", "Issues", "Marketplace", "Explore"];

const Wapper = styled.div`
	position: relative;
	width: 100%;
	height: 62px;
	padding: 16px 32px;
	background-color: rgb(36, 41, 47);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const HeaderBox = styled.div`
	display: flex;
	align-items: center;
	width: auto;
	height: auto;
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
	:hover {
		color: rgb(209, 213, 218);
	}
`;

const SearchBar = styled.div`
	width: 272px;
	height: 30px;
	border: solid 1px rgb(87, 96, 106);
	border-radius: 6px;
	margin: 0 16px;
	padding-left: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const SearchInput = styled.input`
	font-size: 14px;
	color: rgb(209, 213, 218);
`;

const SlashBtn = styled.button`
	width: 20px;
	height: 20px;
	margin-right: 4px;
	border: solid 1px rgb(87, 96, 106);
	border-radius: 3px;
	color: rgb(209, 213, 218);
	text-align: center;
	font-size: 8px;
	font-weight: 100;
`;

const ArrowList = styled.div`
	display: flex;
	width: auto;
	height: auto;
	padding-left: 16px;
	align-items: center;
	cursor: pointer;
	:hover {
		fill: #cccccc;
	}
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const BellBtn = styled(BellIcon)`
	cursor: pointer;
	:hover {
		fill: #cccccc;
	}
`;

const PlusBtn = styled(PlusIcon)`
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
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: azure;
	::after {
		content: "";
		position: absolute;
		width: 14px;
		height: 14px;
		border-radius: 7px;
		border: solid 2px rgb(36, 41, 47);
		right: -7px;
		top: -5px;
		background-image: linear-gradient(#54a3ff, #006eed);
	}
`;
