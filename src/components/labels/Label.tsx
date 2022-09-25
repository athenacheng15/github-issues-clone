import styled from "styled-components";
import { LabelProps } from "../../models/LabelsType";
import { lightOrDark } from "../../utils/colorCalc";

export default function Label({ labelText, bgColor }: LabelProps) {
	return (
		<>
			<LabelBtn bgColor={`#${bgColor}`} color={lightOrDark(`#${bgColor}`)}>
				{labelText}
			</LabelBtn>
		</>
	);
}

interface BtnProps {
	bgColor: string;
}

const LabelBtn = styled.button<BtnProps>`
	width: auto;
	height: 24px;
	font-size: 12px;
	font-weight: 500;
	border-radius: 12px;
	padding: 0 12px;
	text-align: center;
	background-color: ${(props) => props.bgColor};
	color: ${(props) => (props.color === "light" ? "black" : "white")};
	border: ${(props) =>
		props.bgColor === "#ffffff" ? "solid 1px #d1d5da" : "none"};
`;
