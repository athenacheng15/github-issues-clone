import styled from "styled-components";

interface Props {
	text: string;
	width: string;
	colorType: string;
}

export default function NormalBtn({ text, width, colorType }: Props) {
	return (
		<Btn width={width} colorType={colorType}>
			{text}
		</Btn>
	);
}

interface BtnPrpos {
	width: string;
	colorType: string;
}

const Btn = styled.button<BtnPrpos>`
	width: ${(props) => props.width};
	height: 32px;
	color: ${(props) => (props.colorType === "green" ? "#ffffff" : "#24292f")};
	background-color: ${(props) =>
		props.colorType === "green" ? "#2da44e" : "none"};
	text-align: center;
	border: solid 1px
		${(props) => (props.colorType === "green" ? "#4d9053" : "#d1d5da")};
	border-radius: 6px;
	font-size: 14px;
	font-weight: 500;
	white-space: nowrap;
	cursor: pointer;
	:hover {
		background-color: ${(props) =>
			props.colorType === "green" ? "#56a058" : "#f2f2f2"};
	}
`;
