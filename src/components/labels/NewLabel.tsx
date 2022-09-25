import styled from "styled-components";
import { useState } from "react";
import { EditLabelKey } from "../../models/LabelsType";
import ColorManager from "./ColorManager";

interface NewlabelProps {
	isShown: boolean;
}

export default function NewLabel({ isShown }: NewlabelProps) {
	const [randomColorCode, setRandomColorCode] = useState(
		Math.floor(Math.random() * 16777215).toString(16)
	);

	const [newLabel, setNewLabel] = useState({
		name: "",
		description: "18 years old genius.",
		color: randomColorCode,
	});

	return (
		<>
			<Wrapper isShown={isShown}>
				<ColorManager
					bgColor={newLabel.color}
					isShown={true}
					submitType={"Create label"}
					labelText={newLabel.name === "" ? "Label preview" : newLabel.name}
					newLabel={newLabel}
					setNewLabel={setNewLabel}
				/>
			</Wrapper>
		</>
	);
}
interface WrapperProps {
	isShown: boolean;
}

const Wrapper = styled.div<WrapperProps>`
	width: 100%;
	height: auto;
	border: solid 1px #d1d5da;
	border-radius: 6px;
	background-color: #f6f8fa;
	margin-bottom: 16px;
	padding: 16px;
	display: ${(props) => (props.isShown ? "block" : "none")};
`;
