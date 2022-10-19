import styled from "styled-components";
import { useState, Dispatch, SetStateAction } from "react";
import { EditLabelKey } from "../../models/LabelsType";
import ColorManager from "./ColorManager";
import { generateRendomColor } from "../../utils/utils";

interface NewlabelProps {
	isShown: boolean;
	setNewLabelVis?: Dispatch<SetStateAction<boolean>>;
}

export default function NewLabel({ isShown, setNewLabelVis }: NewlabelProps) {
	const [randomColorCode, setRandomColorCode] = useState(generateRendomColor());

	const [newLabel, setNewLabel] = useState<EditLabelKey>({
		name: "",
		description: "",
		color: randomColorCode,
	});

	return (
		<>
			<Wrapper isShown={isShown}>
				<ColorManager
					bgColor={newLabel.color}
					isShown={true}
					submitType={"Create label"}
					labelText={newLabel.name}
					description={newLabel.description}
					newLabel={newLabel}
					setNewLabel={setNewLabel}
					setNewLabelVis={setNewLabelVis}
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
