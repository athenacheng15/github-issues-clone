import styled from "styled-components";

interface BtnProps {
	icon: JSX.Element;
	btnText: string;
	num?: number;
	dotDisplay?: boolean;
	isActive: boolean;
	onClick?: () => void;
}

export default function FilledBtn({
	icon,
	btnText,
	num,
	dotDisplay,
	isActive,
	onClick,
}: BtnProps) {
	return (
		<>
			<Wrapper isActive={isActive}>
				<FilledButton isActive={isActive} onClick={onClick}>
					<IconWrapper>{icon}</IconWrapper>
					<div>{btnText}</div>
					<Dot dotDisplay={dotDisplay}>{num}</Dot>
				</FilledButton>
			</Wrapper>
		</>
	);
}

interface ActiveProp {
	isActive: boolean;
}

const Wrapper = styled.div<ActiveProp>`
	width: auto;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: -1px;
	border-bottom: ${(props) => (props.isActive ? "solid 2px #fd8C73" : "none")};
`;

const FilledButton = styled.button<ActiveProp>`
	width: auto;
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 8px;
	border-radius: 6px;
	font-size: 14px;
	font-weight: ${(props) => (props.isActive ? 800 : 400)};
	color: #24292f;
	letter-spacing: 0.2px;
	white-space: nowrap;
	cursor: pointer;
	:hover {
		background-color: #f0f1f2;
	}
	& > *:not(:first-child) {
		margin-left: 8px;
	}
`;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 28px;
	width: auto;
	fill: #24292f;
`;

interface DotProp {
	dotDisplay?: boolean;
}

const Dot = styled.div<DotProp>`
	width: 20px;
	height: 20px;
	border-radius: 100%;
	font-size: 12px;
	background-color: #e8e9ea;
	font-weight: 600;
	text-align: center;
	color: #24292f;
	display: ${(props) => (props.dotDisplay ? "initial" : "none")};
`;
