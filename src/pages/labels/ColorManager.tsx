import styled from "styled-components";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { SyncIcon } from "@primer/octicons-react";
import { RootState } from "../../app/store";
import NormalBtn from "../../components/commons/buttons/NormalBtn";
import { lightOrDark, generateRendomColor } from "../../utils/utils";
import Label from "../../components/commons/tags/Label";
import {
	useEditLabelMutation,
	useCreateLabelMutation,
} from "../../services/labelsApi";
import { EditLabelKey } from "../../models/LabelsType";

interface Props {
	bgColor: string;
	isShown?: boolean;
	submitType: string;
	labelText?: string;
	description?: string;
	newLabel: EditLabelKey;
	setNewLabel: Dispatch<SetStateAction<EditLabelKey>>;
	setNewLabelVis?: Dispatch<SetStateAction<boolean>>;
	setEditAreaVis?: Dispatch<SetStateAction<boolean>>;
}

export default function ColorManager({
	bgColor,
	isShown,
	submitType,
	labelText,
	description,
	newLabel,
	setNewLabel,
	setNewLabelVis,
	setEditAreaVis,
}: Props) {
	const [editLabel] = useEditLabelMutation();
	const [createLabel] = useCreateLabelMutation();
	const [colorCode, setColorCode] = useState(`#${newLabel.color}`);
	const [colorPlateVis, setColorPlateVis] = useState(false);
	const [forbiddenSubmit, setForbiddenSubmit] = useState(true);
	const colorValidate = /^([0-9A-F]{3}){1,2}$/i;
	const colorChecked = colorValidate.test(colorCode.split("#")[1]);
	const loginUser = useSelector((state: RootState) => state.login);

	useEffect(() => {
		checkInput();
	}, [newLabel]);

	function changeName(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		checkInput();
		setNewLabel({ ...newLabel, name: target.value });
	}

	function changeDescription(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		setNewLabel({ ...newLabel, description: target.value });
	}

	function changeColor(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		const formatInputColorvalue = target.value.split("#")[1];
		checkInput();
		setColorCode(target.value);

		if (target.value.length === 0) {
			setColorCode("#");
			return;
		}

		if (colorValidate.test(formatInputColorvalue)) {
			setNewLabel({ ...newLabel, color: formatInputColorvalue });
		}
	}

	function checkInput() {
		setForbiddenSubmit(true);
		if (newLabel.name !== "" && colorChecked) {
			setForbiddenSubmit(false);
		}
	}

	async function handleCreateLabel() {
		await createLabel({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			label: newLabel,
		});
	}

	async function handleEditLabel() {
		await editLabel({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			name: labelText,
			label: {
				new_name: newLabel.name,
				description: newLabel.description,
				color: newLabel.color,
			},
		});
	}

	function handleSubmit() {
		if (submitType === "Create label") {
			handleCreateLabel();
			setNewLabelVis && setNewLabelVis(false);
			const randomColor = generateRendomColor();
			setNewLabel({
				name: "",
				description: "",
				color: randomColor,
			});
			setColorCode(randomColor);
		} else if (submitType === "Save changes") {
			handleEditLabel();
			setEditAreaVis && setEditAreaVis(false);
		}
	}

	function handleCancel() {
		setNewLabel({
			name: labelText,
			description: description,
			color: bgColor,
		});
		setNewLabelVis && setNewLabelVis(false);
		setEditAreaVis && setEditAreaVis(false);
	}

	return (
		<>
			<LabelWrapper>
				<Label
					labelText={newLabel.name === "" ? "Label preview" : newLabel.name}
					bgColor={newLabel.color}
				/>
			</LabelWrapper>
			<Wrapper isShown={isShown}>
				<FormGroup width="23%">
					<FormLabel>Label name</FormLabel>
					<FormControl
						width="100%"
						placeholder="Label name"
						value={newLabel.name}
						onChange={changeName}
					/>
				</FormGroup>
				<FormGroup width="30%">
					<FormLabel>Description</FormLabel>
					<FormControl
						width="100%"
						placeholder="Description (optional)"
						value={newLabel.description}
						onChange={changeDescription}
					/>
				</FormGroup>
				<FormGroup width="20%">
					<FormLabel>Color</FormLabel>
					<ColorBtn
						bgColor={`#${newLabel.color}`}
						onClick={() => {
							const randomColor = generateRendomColor();
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
						falseColor={!colorChecked}
						onClick={() => setColorPlateVis(true)}
						// onBlur={() => setColorPlateVis(false)}
					/>
					<PlateWrapper isShown={colorPlateVis}>
						<PlateBox>
							<PlateText>Choose from default colors:</PlateText>
							<PlateGroup>
								{defaultColors.map((color) => (
									<ColorPlateBtn
										key={color}
										bgColor={`#${color}`}
										onClick={() => {
											setColorCode(`#${color}`);
											setNewLabel({ ...newLabel, color: color });
											setColorPlateVis(false);
										}}
									/>
								))}
							</PlateGroup>
						</PlateBox>
					</PlateWrapper>
				</FormGroup>
				<BtnGroup>
					<BtnWrapper onClick={handleCancel}>
						<NormalBtn text="Cancel" width="80px" colorType="white" />
					</BtnWrapper>
					<BtnWrapper onClick={handleSubmit} disabled={forbiddenSubmit}>
						<NormalBtn
							text={submitType}
							width="115px"
							colorType="green"
							disabled={forbiddenSubmit}
						/>
					</BtnWrapper>
				</BtnGroup>
			</Wrapper>
		</>
	);
}

const defaultColors = [
	"b60205",
	"d93f0b",
	"fbca04",
	"0e8a16",
	"006b75",
	"1d76db",
	"0052cc",
	"5319e7",
	"e99695",
	"f9d0c4",
	"fef2c0",
	"c2e0c6",
	"bfdadc",
	"c5def5",
	"bfd4f2",
	"d4c5f9",
];

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
	position: relative;

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
	falseColor?: boolean;
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
	color: ${(props) => (props.falseColor ? "red" : "default")};
	::placeholder {
		color: #57606a;
	}
	:focus {
		background-color: #ffffff;
		border: 2px solid #0969da;
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

const PlateWrapper = styled.div<WrapperProps>`
	position: absolute;
	left: 32px;
	top: 60px;
	z-index: 2;
	display: ${(props) => (props.isShown ? "initial" : "none")};
`;

const PlateBox = styled.div`
	position: relative;
	width: 232px;
	height: 100px;
	border: 1px solid #cccccc;
	background-color: #ffffff;
	border-radius: 6px;
	padding: 8px 0 8px 8px;

	::after {
		position: absolute;
		content: "";
		top: -9px;
		left: 16px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 8px 9px 8px;
		border-color: transparent transparent #ffffff transparent;
	}
	::before {
		position: absolute;
		content: "";
		top: -10px;
		left: 14px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 10px 11px 10px;
		border-color: transparent transparent #cccccc transparent;
		z-index: -1;
	}
`;

const PlateText = styled.p`
	font-size: 12px;
	color: #57606a;
`;

const PlateGroup = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	& > *:not(:last-child) {
		margin-right: 3px;
	}
`;

interface PlatrBtnProp {
	bgColor: string;
}
const ColorPlateBtn = styled.button<PlatrBtnProp>`
	width: 24px;
	height: 24px;
	background-color: ${(props) => props.bgColor};
	border-radius: 6px;
	margin: 4px 0;
	cursor: pointer;
`;
