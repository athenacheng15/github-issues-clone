import styled from "styled-components";
import { TriangleDownIcon } from "@primer/octicons-react";

interface BtnProps {
	icon: JSX.Element;
	btnText: string;
	num?: number;
	dotDisplay?: boolean;
	triangleDisplay?: boolean;
}

export default function SingleOutlineBtn({
	icon,
	btnText,
	num,
	dotDisplay,
	triangleDisplay,
}: BtnProps) {
	return (
		<>
			<OutLineBtn>
				<div>{icon}</div>
				<div>{btnText}</div>
				<Dot dotDisplay={dotDisplay}>{num}</Dot>
				<TriangleBox triangleDisplay={triangleDisplay}>
					<TriangleDownIcon fill="#24292f" />
				</TriangleBox>
			</OutLineBtn>
		</>
	);
}

const OutLineBtn = styled.button`
	width: auto;
	height: 28px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 12px;
	border: solid 1px #d1d5da;
	border-radius: 6px;
	font-size: 12px;
	font-weight: 500;
	color: #24292f;
	cursor: pointer;
	:hover {
		background-color: #f3f3f6;
	}
	& > *:not(:first-child) {
		margin-left: 5px;
	}
`;

interface DotProp {
	dotDisplay?: boolean;
}

const Dot = styled.div<DotProp>`
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: #e8e9ea;
	font-weight: 600;
	text-align: center;
	color: #24292f;
	display: ${(props) => (props.dotDisplay ? "initial" : "none")};
`;

interface TriangleProp {
	triangleDisplay?: boolean;
}

const TriangleBox = styled.div<TriangleProp>`
	display: ${(props) => (props.triangleDisplay ? "initial" : "none")};
`;
