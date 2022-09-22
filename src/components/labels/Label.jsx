import styled from "styled-components";

export default function Label({ labelText, bgColor }) {
	function lightOrDark(bgcolor = bgColor) {
		bgcolor = +(
			"0x" + bgcolor.slice(1).replace(bgcolor.length < 5 && /./g, "$&$&")
		);

		const r = bgcolor >> 16;
		const g = (bgcolor >> 8) & 255;
		const b = bgcolor & 255;
		const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

		if (hsp > 128.2) {
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
	padding: 0 10px;
	text-align: center;
	background-color: ${(props) => props.bgColor};
	color: ${(props) => (props.color === "light" ? "black" : "white")};
`;
