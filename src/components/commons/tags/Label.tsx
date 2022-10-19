import styled from "styled-components";
import { LabelProps } from "../../../models/LabelsType";
import { lightOrDark } from "../../../utils/utils";

export default function Label({ labelText, bgColor, padding }: LabelProps) {
	return (
		<>
			<LabelBtn
				bgColor={`#${bgColor}`}
				color={lightOrDark(`#${bgColor}`)}
				padding={padding}
			>
				{labelText}
			</LabelBtn>
		</>
	);
}

interface BtnProps {
	bgColor: string;
	padding?: string;
}

const LabelBtn = styled.button<BtnProps>`
	width: auto;
	height: ${(props) => (props.padding === "s" ? "20px" : "auto")};
	font-size: 12px;
	font-weight: 500;
	border-radius: 12px;
	margin-right: 4px;
	padding: ${(props) => (props.padding === "s" ? "1px 8px" : "3px 12px")};
	text-align: center;
	background-color: ${(props) => props.bgColor};
	color: ${(props) => (props.color === "light" ? "black" : "white")};
	border: ${(props) =>
		props.bgColor === "#ffffff" ? "solid 1px #d1d5da" : "none"};
`;
