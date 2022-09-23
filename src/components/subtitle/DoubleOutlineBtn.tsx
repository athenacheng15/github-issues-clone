import styled from "styled-components";
import { TriangleDownIcon } from "@primer/octicons-react";

interface BtnProps {
	icon: JSX.Element;
	btnText: string;
	num: number;
	dotDisplay: boolean;
}

export default function DoubleOutlineBtn({
	icon,
	btnText,
	num,
	dotDisplay,
}: BtnProps) {
	return (
		<>
			<Wrapper>
				<OutLineBtnLeft>
					<div>{icon}</div>
					<div>{btnText}</div>
					<Dot dotDisplay={dotDisplay}>{num}</Dot>
				</OutLineBtnLeft>
				<OutLineBtnRight>
					<TriangleDownIcon fill="#24292f" />
				</OutLineBtnRight>
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	width: auto;
	height: auto;
	display: flex;
`;

const OutLineBtnLeft = styled.button`
	width: auto;
	min-width: 103px;
	height: 28px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 12px;
	border: solid 1px #d1d5da;
	border-top-left-radius: 6px;
	border-bottom-left-radius: 6px;
	font-size: 12px;
	font-weight: 500;
	color: #24292f;
	cursor: pointer;
	& > *:not(:first-child) {
		margin-left: 5px;
	}
	:hover {
		background-color: #f3f3f6;
	}
`;

interface DotProps {
	dotDisplay: boolean;
}

const Dot = styled.div<DotProps>`
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: #e8e9ea;
	font-weight: 600;
	text-align: center;
	color: #24292f;
	display: ${(props) => (props.dotDisplay ? "initial" : "none")};
`;

const OutLineBtnRight = styled.button`
	width: auto;
	height: 28px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;
	border: solid 1px #d1d5da;
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
	border-left: none;
	color: #24292f;
	cursor: pointer;
	:hover {
		background-color: #f3f3f6;
	}
`;
