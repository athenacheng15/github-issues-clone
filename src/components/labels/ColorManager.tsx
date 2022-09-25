import styled from "styled-components";
import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import { SyncIcon } from "@primer/octicons-react";
import NormalBtn from "../../commons/NormalBtn";
import lightOrDark from "../../utils/colorCalc";
import Label from "./Label";
import {
	useEditLabelMutation,
	useCreateLabelMutation,
} from "../../services/labelsApi";
import { EditLabelKey } from "../../models/LabelsType";

interface Props {
	bgColor: string;
	isShown?: boolean;
	submitType: string;
	labelText: string;
	newLabel: EditLabelKey;
	setNewLabel: Dispatch<SetStateAction<EditLabelKey>>;
}

export default function ColorManager({
	bgColor,
	isShown,
	submitType,
	labelText,
	newLabel,
	setNewLabel,
}: Props) {
	const [editLabel] = useEditLabelMutation();
	const [createLabel] = useCreateLabelMutation();
	const [colorCode, setColorCode] = useState(`#${newLabel.color}`);

	function changeName(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		setNewLabel({ ...newLabel, name: target.value });
	}

	function changeDescription(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		setNewLabel({ ...newLabel, description: target.value });
	}

	function changeColor(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		const colorValidate = /^[0-9a-f]{3}([0-9a-f]{3})?$/i;
		const formatInputColorvalue = target.value.split("#")[1];
		setColorCode(target.value);

		if (target.value.length === 0) {
			setColorCode("#");
			return;
		}

		if (colorValidate.test(formatInputColorvalue)) {
			setNewLabel({ ...newLabel, color: formatInputColorvalue });
		}
	}

	function handleSubmit() {
		if (submitType === "Create label") {
			handleCreateLabel();
		} else if (submitType === "Save changes") {
			handleEditLabel();
		}
	}

	async function handleCreateLabel() {
		await createLabel({
			owner: "athenacheng15",
			repo: "issue_test",
			label: newLabel,
		});
	}

	async function handleEditLabel() {
		await editLabel({
			owner: "athenacheng15",
			repo: "issue_test",
			name: "Axian",
			label: newLabel,
		});
	}

	return (
		<>
			<LabelWrapper>
				<Label labelText={labelText} bgColor={newLabel.color} />
			</LabelWrapper>
			<Wrapper isShown={isShown}>
				<FormGroup width="23%">
					<FormLabel>Label name</FormLabel>
					<FormControl
						width="100%"
						placeholder="Label name"
						onChange={changeName}
					/>
				</FormGroup>
				<FormGroup width="30%">
					<FormLabel>Description</FormLabel>
					<FormControl
						width="100%"
						placeholder="Description (optional)"
						onChange={changeDescription}
					/>
				</FormGroup>
				<FormGroup width="20%">
					<FormLabel>Color</FormLabel>
					<ColorBtn
						bgColor={`#${newLabel.color}`}
						onClick={() => {
							const randomColor = Math.floor(Math.random() * 16777215).toString(
								16
							);
							setNewLabel({
								...newLabel,
								color: randomColor,
							});
							setColorCode(`#${randomColor}`);
						}}
					>
						<SyncIcon
							fill={
								lightOrDark(`#${newLabel.color}`) === "dark" ? "#fff" : "#000"
							}
						/>
					</ColorBtn>
					<FormControl
						width="70%"
						maxLength={7}
						value={colorCode.toUpperCase()}
						onChange={changeColor}
					/>
				</FormGroup>
				<BtnGroup>
					<BtnWrapper>
						<NormalBtn text="Cancel" width="80px" colorType="white" />
					</BtnWrapper>
					<BtnWrapper onClick={handleSubmit}>
						<NormalBtn text={submitType} width="115px" colorType="green" />
					</BtnWrapper>
				</BtnGroup>
			</Wrapper>
		</>
	);
}

interface WrapperProps {
	isShown?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
	width: 100%;
	height: auto;
	display: ${(props) => (props.isShown ? "flex" : "none")};
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-end;
	@media screen and (max-width: 767px) {
		flex-wrap: wrap;
	}
`;

const LabelWrapper = styled.div`
	width: 100%;
	height: auto;
`;

interface FormGroupProps {
	width: string;
}

const FormGroup = styled.div<FormGroupProps>`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 25px;
	margin-bottom: 8px;
	margin-right: 16px;
	width: ${(props) => props.width};

	@media screen and (max-width: 1011px) {
		width: 28%;
	}
	@media screen and (max-width: 767px) {
		width: 100%;
		justify-content: space-between;
		margin-right: 0;
		margin-top: 16px;
	}
`;

const FormLabel = styled.label`
	width: 100%;
	font-size: 14px;
	font-weight: 600;
	display: block;
	margin-bottom: 6px;

	@media screen and (max-width: 767px) {
		width: 100%;
	}
`;

interface FormControlProps {
	width: string;
	width2?: string;
}

const FormControl = styled.input<FormControlProps>`
	width: ${(props) => props.width};
	height: 30px;
	border: solid 1px #d1d5da;
	border-radius: 6px;
	background-color: #f6f8fa;
	font-size: 14px;
	font-weight: 400;
	padding-left: 8px;
	::placeholder {
		color: #57606a;
	}
	@media screen and (max-width: 767px) {
		width: ${(props) => props.width2 || "100%"};
		flex: content;
	}
`;

interface ColorBtnProps {
	bgColor: string;
}

const ColorBtn = styled.button<ColorBtnProps>`
	width: 30px;
	height: 30px;
	background-color: ${(props) => props.bgColor};
	border-radius: 6px;
	margin-right: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const BtnGroup = styled.div`
	display: flex;
	flex: content;
	align-items: center;
	justify-content: flex-end;
	margin-top: 30px;
	margin-bottom: 8px;
	& > *:first-child {
		margin-right: 8px;
	}
	@media screen and (max-width: 767px) {
		width: 100%;
		flex-direction: row-reverse;
		margin-top: 8px;
		& > *:last-child {
			margin-right: 8px;
		}
	}
`;

const BtnWrapper = styled.button`
	width: auto;
	height: auto;
`;