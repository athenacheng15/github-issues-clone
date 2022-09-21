import styled from "styled-components";

export default function Label({ borderColor, bgColor, color, labelText }) {
	return (
		<>
			<LabelBtn borderColor={borderColor} bgColor={bgColor} color={color}>
				{labelText}
			</LabelBtn>
		</>
	);
}

const LabelBtn = styled.button`
	width: auto;
	height: 20px;
	font-size: 12px;
	font-weight: 500;
	border-radius: 10px;
	padding: 0 8px;
	text-align: center;
	border: solid 1px ${(props) => props.borderColor};
	background-color: ${(props) => props.bgColor};
	color: ${(props) => props.color};
`;
