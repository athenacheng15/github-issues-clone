import styled from "styled-components";
import { useState } from "react";
import NormalBtn from "../../commons/NormalBtn";
import { SyncIcon } from "@primer/octicons-react";

interface Props {
	bgColor: string;
}

export default function CreateBar({ bgColor }: Props) {
	const [labelData, setLabelData] = useState({
		labelName: "",
		decription: "",
		color: "",
	});

	return (
		<>
			<Wrapper>
				<FormGroup width="24%">
					<FormLabel>Label name</FormLabel>
					<FormControl width="100%" />
				</FormGroup>
				<FormGroup width="32%">
					<FormLabel>Label name</FormLabel>
					<FormControl width="100%" />
				</FormGroup>
				<FormGroup width="20%">
					<FormLabel>Label name</FormLabel>
					<ColorBtn bgColor={bgColor}>
						<SyncIcon />
					</ColorBtn>
					<FormControl width="70%" />
				</FormGroup>
				<BtnGroup>
					<NormalBtn text="Cancel" width="80px" colorType="white" />
					<NormalBtn text="Create label" width="115px" colorType="green" />
				</BtnGroup>
			</Wrapper>
		</>
	);
}

const formInputs = [
	{ label: "Label name", key: "name" },
	{ label: "Description", key: "description" },
	{ label: "Color", key: "color" },
];

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;

	align-items: flex-end;
	@media screen and (max-width: 767px) {
		flex-wrap: wrap;
	}
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
		width: 24%;
	}
	@media screen and (max-width: 767px) {
		width: 100%;
		justify-content: space-between;
		margin-right: 0;
	}
`;

const BtnGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 30px;
	width: 25%;
	& > *:first-child {
		margin-right: 8px;
	}
	@media screen and (max-width: 767px) {
		width: 100%;
		flex-direction: row-reverse;
		& > *:last-child {
			margin-right: 8px;
		}
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
