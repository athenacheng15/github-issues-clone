import styled from "styled-components";
import Label from "./Label";

export default function LabelBar({ labelText, bgColor }) {
	return (
		<Wrapper>
			<Label labelText={labelText} bgColor={bgColor}></Label>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	width: 100%;
	height: 55px;
	border: solid 1px #d1d5da;
	border-top: none;
`;
