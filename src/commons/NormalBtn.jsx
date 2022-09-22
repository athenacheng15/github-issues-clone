import styled from "styled-components";

export default function NormalBtn({ text }) {
	return <Btn>{text}</Btn>;
}

const Btn = styled.button`
	width: 100px;
	height: 32px;
	color: #ffffff;
	background-color: #2da44e;
	text-align: center;
	border: solid 1px #4d9053;
	border-radius: 6px;
	font-size: 14px;
	font-weight: 500;
	white-space: nowrap;
	cursor: pointer;
	:hover {
		background-color: #56a058;
	}
`;
