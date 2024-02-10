import { MouseEventHandler, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface ListProps {
	right: string;
	top: string;

	listitems: {
		name: string;
		action?: MouseEventHandler<HTMLButtonElement>;
		first?: boolean;
		last?: boolean;
	}[];
	dropDownVis: boolean;
	setDropDownVis?: Dispatch<SetStateAction<boolean>>;
	width: string;
}

export default function DropdownList({
	right,
	top,
	listitems,
	dropDownVis,
	width,
}: ListProps) {
	return (
		<>
			<Wrapper right={right} top={top} isShown={dropDownVis}>
				<ListBox width={width}>
					{listitems.map((item, index) => (
						<BtnText
							key={index}
							onClick={item.action}
							name={item.name}
							first={item.first}
							last={item.last}
						>
							{item.name}
						</BtnText>
					))}
				</ListBox>
			</Wrapper>
		</>
	);
}

interface WrapperProps {
	right: string;
	top: string;
	isShown: boolean;
}

const Wrapper = styled.div<WrapperProps>`
	position: absolute;
	right: ${(props) => props.right};
	top: ${(props) => props.top};
	display: ${(props) => (props.isShown ? "initial" : "none")};
	z-index: 1;
`;

interface BoxWidth {
	width: string;
}

const ListBox = styled.div<BoxWidth>`
	position: relative;
	width: ${(props) => props.width};
	height: auto;
	border: 1px solid #cccccc;
	background-color: #ffffff;
	border-radius: 6px;
	padding: 4px 0;

	::after {
		position: absolute;
		content: "";
		top: -9px;
		right: 9px;
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
		right: 7px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 10px 11px 10px;
		border-color: transparent transparent #cccccc transparent;
		z-index: -1;
	}
`;

interface BtnProps {
	name: string;
	first?: boolean;
	last?: boolean;
}

const BtnText = styled.button<BtnProps>`
	width: 100%;
	height: auto;
	padding: 4px 16px;
	font-size: 14px;
	color: ${(props) => (props.name === "Delete" ? "#cf222e" : "#24292f")};
	border-bottom: ${(props) => (props.last ? "solid 1px #cccccc" : "none")};
	cursor: pointer;
	:hover {
		color: #ffffff;
		background-color: ${(props) =>
			props.name === "Delete" ? "#cf222e" : "#0969da"};
	}
`;
