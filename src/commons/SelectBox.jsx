import styled from "styled-components";
import { CheckIcon } from "@primer/octicons-react";

export default function SelectBox({ textList, isShown }) {
	return (
		<>
			<Wrapper isShown={isShown}>
				<TitleText>Sort</TitleText>
				{textList.map((item) => (
					<ContentItem key={item} text={item} />
				))}
			</Wrapper>
		</>
	);
}

function ContentItem({ text }) {
	return (
		<Content>
			<CheckBtn>
				<CheckIcon />
			</CheckBtn>
			<ContentText>{text}</ContentText>
		</Content>
	);
}

const Wrapper = styled.div`
	position: absolute;
	right: 0;
	top: 25px;
	width: 298px;
	height: auto;
	background-color: #ffffff;
	border: solid 1px #d1d5da;
	border-radius: 6px;
	display: ${(props) => (props.isShown ? "initial" : "none")};
`;

const TitleText = styled.p`
	font-size: 12px;
	font-weight: 600;
	padding: 8px 10px;
	color: black;
	border-bottom: solid 1px #d1d5da;
`;

const Content = styled.div`
	padding: 8px 10px;
	display: flex;
	align-items: center;
	:not(:last-child) {
		border-bottom: solid 1px #d1d5da;
	}
	:hover {
		background-color: #0969da;
		color: #ffffff;
	}
`;

const CheckBtn = styled.div`
	display: flex;
	align-items: center;
`;

const ContentText = styled.p`
	font-size: 12px;
	padding-left: 3px;
`;
