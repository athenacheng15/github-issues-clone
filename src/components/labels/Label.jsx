import styled from "styled-components";

export default function Label({ labelText, bgColor }) {
	function lightOrDark(color = bgColor) {
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		const hsp = r * 0.3 + g * 0.6 + b * 0.1;
		if (hsp > 127.5) {
			return "light";
		} else {
			return "dark";
		}
	}

	return (
		<>
			<LabelBtn bgColor={bgColor} color={lightOrDark(bgColor)}>
				{labelText}
			</LabelBtn>
		</>
	);
}

const LabelBtn = styled.button`
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
