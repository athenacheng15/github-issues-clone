import styled from "styled-components";

interface TagProp {
	text: string;
	display?: boolean;
	self?: boolean;
}

export default function Tag({ text, display, self }: TagProp) {
	return (
		<div className={`${display ? "block" : "hidden"}`}>
			<TagBtn self={self}>{text}</TagBtn>
		</div>
	);
}

interface BtnProps {
	self?: boolean;
}

const TagBtn = styled.button<BtnProps>`
	display: flex;
	align-items: center;
	width: auto;
	height: 20px;
	font-size: 12px;
	font-weight: 500;
	border-radius: 12px;
	margin-right: 4px;
	padding: 1px 8px;
	text-align: center;
	color: #57606a;
	border: solid 1px ${(props) => (props.self ? " #54aeff66" : "#d1d5da")};
`;
