import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import { useDeleteLabelsMutation } from "../../services/labelsApi";
import { EditLabelKey } from "../../models/LabelsType";
import SelectList from "../../components/commons/dropdown/SelectList";
import ColorManager from "./ColorManager";

interface BarProps {
	labelText: string;
	bgColor: string;
	description?: string;
	id: number;
}

export default function LabelBar({
	labelText,
	bgColor,
	description,
}: BarProps) {
	const loginUser = useSelector((state: RootState) => state.login);
	const [editAreaVis, setEditAreaVis] = useState(false);
	const [dotListVis, setDotListVis] = useState(false);
	const [deleteLabel] = useDeleteLabelsMutation();

	const [newLabel, setNewLabel] = useState<EditLabelKey>({
		name: labelText,
		description: description,
		color: bgColor,
	});

	async function handleDeleteLabel() {
		await deleteLabel({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			name: labelText,
		});
	}

	return (
		<Wrapper>
			<DataBox>
				<Discription isShown={!editAreaVis}>{description}</Discription>
				<Used>
					<TextBtn></TextBtn>
				</Used>
				<EditAndDelete>
					<TextBtn onClick={() => setEditAreaVis(!editAreaVis)}>Edit</TextBtn>
					<TextBtn onClick={handleDeleteLabel}>Delete</TextBtn>
				</EditAndDelete>
				<DotBox>
					<DotBtn onClick={() => setDotListVis(!dotListVis)}>
						<KebabHorizontalIcon />
					</DotBtn>
					<SelectList
						right="-2px"
						top="30px"
						listitems={["Edit", "Delete"]}
						isShown={dotListVis}
					/>
				</DotBox>
			</DataBox>
			<ColorManager
				labelText={labelText}
				bgColor={bgColor}
				description={description}
				isShown={editAreaVis}
				submitType={"Save changes"}
				newLabel={newLabel}
				setNewLabel={setNewLabel}
				setEditAreaVis={setEditAreaVis}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	width: 100%;
	height: auto;
	border: solid 1px #d1d5da;
	border-top: none;

	:last-child {
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
	}
`;

const DataBox = styled.div`
	width: 100%;
	height: auto;
	position: absolute;
	display: flex;
	justify-content: flex-end;
	right: 16px;
	top: 16px;
`;

interface DiscriptionProps {
	isShown: boolean;
}

const Discription = styled.p<DiscriptionProps>`
	width: 35%;
	font-size: 12px;
	color: #57606a;
	display: ${(props) => (props.isShown ? "initial" : "none")};
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const Used = styled.div`
	/* flex-grow: 1; */
	width: 25%;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const TextBtn = styled.button`
	font-size: 12px;
	color: #57606a;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
`;

const EditAndDelete = styled.div`
	width: 15%;
	display: flex;
	justify-content: flex-end;
	& > *:not(:last-child) {
		margin: 0 16px;
	}
	@media screen and (max-width: 1011px) {
		display: none;
	}
`;

const DotBox = styled.div`
	position: relative;
	width: 15%;
	height: auto;
	display: none;
	@media screen and (max-width: 1011px) {
		display: initial;
	}
`;

const DotBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 12px;
	margin-left: auto;
	width: 40px;
	height: 28px;
	border: solid 1px #d1d5da;
	border-radius: 6px;
	background-color: #f6f8fa;
	cursor: pointer;
	:hover {
		background-color: #0969da;
		color: #ffffff;
	}
`;
