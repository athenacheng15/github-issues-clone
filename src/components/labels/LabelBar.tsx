import styled from "styled-components";
import { useState } from "react";
import Label from "./Label";
import SelectList from "../../commons/SelectList";
import { KebabHorizontalIcon } from "@primer/octicons-react";

interface BarProps {
	labelText: string;
	bgColor: string;
	description: string;
	id: number;
}

export default function LabelBar({
	labelText,
	bgColor,
	description,
}: BarProps) {
	const [dotListVis, setDotListVis] = useState(false);
	return (
		<Wrapper>
			<LabelBox>
				<Label labelText={labelText} bgColor={bgColor}></Label>
			</LabelBox>
			<Discription>{description}</Discription>
			<Used>
				<TextBtn></TextBtn>
			</Used>
			<EditAndDelete>
				<TextBtn>Edit</TextBtn>
				<TextBtn>Delete</TextBtn>
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
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	width: 100%;
	height: 55px;
	border: solid 1px #d1d5da;
	border-top: none;

	:last-child {
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
	}
`;

const LabelBox = styled.div`
	width: 25%;
`;

const Discription = styled.p`
	width: 35%;
	font-size: 12px;
	color: #57606a;
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
