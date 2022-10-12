import styled from "styled-components";

interface Props {
	text: string;
	width: string;
	colorType: string;
	disabled?: boolean;
	onClick?: () => void;
	size?: string;
}

export default function NormalBtn({
	text,
	width,
	colorType,
	disabled,
	onClick,
	size,
}: Props) {
	return (
		<Btn
			width={width}
			colorType={colorType}
			disabled={disabled}
			onClick={onClick}
			size={size}
		>
			{text}
		</Btn>
	);
}

interface BtnPrpos {
	width: string;
	colorType: string;
	disabled?: boolean;
	size?: string;
}

const Btn = styled.button<BtnPrpos>`
	width: ${(props) => props.width};
	height: ${(props) => (props.size === "s" ? "28px" : "32px")};
	color: ${(props) => (props.colorType === "green" ? "#ffffff" : "#24292f")};
	background-color: ${(props) =>
		props.colorType === "green"
			? "#2da44e"
			: props.colorType === "gray"
			? "#f6f8fa"
			: "none"};
	text-align: center;
	border: solid 1px
		${(props) => (props.colorType === "green" ? "#4d9053" : "#d1d5da")};
	border-radius: 6px;
	font-size: ${(props) => (props.size === "s" ? "12px" : "14px")};
	font-weight: 500;
	padding: 0 ${(props) => (props.size === "s" ? "12px" : "16px")};
	white-space: nowrap;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};
	:hover:not([disabled]) {
		background-color: ${(props) =>
			props.colorType === "green" ? "#56a058" : "#f2f2f2"};
	}
`;
