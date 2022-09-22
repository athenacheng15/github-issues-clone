import styled from "styled-components";
import { SmileyIcon } from "@primer/octicons-react";

interface Props {
	right: string;
	top: string;
	isShown: boolean;
}

export default function UserSelectList({ right, top, isShown }: Props) {
	return (
		<>
			<Wrapper right={right} top={top} isShown={isShown}>
				<ListBox>
					<UserDataText>
						Signed in as <strong>UserNameeee</strong>
					</UserDataText>
					<Line />
					<StatusBtn>
						<SmileyIcon /> Set status
					</StatusBtn>
					<Line />
					{listitems1.map((item, index) => (
						<LinkText key={index}>{item}</LinkText>
					))}
					<Line />
					{listitems2.map((item, index) => (
						<LinkText key={index}>{item}</LinkText>
					))}
					<Line />
					<LinkText>Sign out</LinkText>
				</ListBox>
			</Wrapper>
		</>
	);
}

const listitems1 = [
	"Your profile",
	"Your repositories",
	"Your codespaces",
	"Your organizations",
	"Your projects",
	"Your stars",
	"Your gists",
];

const listitems2 = ["Upgrade", "Feature preview", "Help", "Settings"];

const Wrapper = styled.div`
	position: absolute;
	right: ${(props: Props) => props.right};
	top: ${(props) => props.top};
	display: ${(props) => (props.isShown ? "initial" : "none")};
`;

const ListBox = styled.div`
	position: relative;
	width: 180px;
	height: auto;
	border: 1px solid #cccccc;
	background-color: #ffffff;
	border-radius: 6px;
	padding: 4px 0;

	::after {
		position: absolute;
		content: "";
		top: -9px;
		right: 9px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 8px 9px 8px;
		border-color: transparent transparent #ffffff transparent;
	}
`;

const LinkText = styled.button`
	width: 100%;
	height: 29px;
	padding-left: 16px;
	font-size: 14px;
	cursor: pointer;
	:hover {
		color: #ffffff;
		background-color: #0969da;
	}
`;

const Line = styled.hr`
	width: 100%;
	border-top: solid 1px #cccccc;
	margin: 8px 0;
`;

const UserDataText = styled.p`
	padding-left: 16px;
	padding-top: 4px;
	font-size: 14px;
`;

const StatusBtn = styled.button`
	width: 148px;
	height: 30px;
	margin: 0 16px;
	border: solid 1px #cccccc;
	border-radius: 6px;
	color: rgb(87, 96, 106);
	font-size: 12px;
	padding-left: 8px;
	cursor: pointer;
	:hover {
		color: #0969da;
	}
	& > * {
		margin-right: 4px;
	}
`;
