import styled from "styled-components";

interface Props {
	icon1: JSX.Element;
	text1: string;
	icon2: JSX.Element;
	text2: string;
	num1?: number;
	num2?: number;
	onClick1?: () => void;
}

export default function DoubleIconBtn({
	icon1,
	text1,
	icon2,
	text2,
	num1,
	num2,
	onClick1,
}: Props) {
	return (
		<>
			<DoubleBtn>
				<OutLineBtnLeft onClick={onClick1}>
					{icon1} <div>{text1}</div> <Dot isShown={num1}>{num1}</Dot>
				</OutLineBtnLeft>
				<OutLineBtnRight>
					{icon2} <div>{text2}</div>
					<Dot isShown={num2}>{num2}</Dot>
				</OutLineBtnRight>
			</DoubleBtn>
		</>
	);
}

const DoubleBtn = styled.div`
	width: auto;
	height: auto;
	display: flex;
	margin-right: 8px;

	@media screen and (max-width: 767px) {
		flex: auto;
	}
`;
interface DotProp {
	isShown?: number;
}

const Dot = styled.div<DotProp>`
	width: auto;
	min-width: 17px;
	height: 17;
	border-radius: 10px;
	text-align: center;
	font-size: 12px;
	margin-left: 4px;
	padding: 0 6px;
	background-color: #e8e9ea;
	display: ${(props) => (props.isShown === undefined ? "none" : "initial")};
`;

const OutLineBtn = styled.button`
	width: auto;
	height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 16px;
	border: solid 1px #d1d5da;
	font-size: 14px;
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

const OutLineBtnLeft = styled(OutLineBtn)`
	border-top-left-radius: 6px;
	border-bottom-left-radius: 6px;
`;

const OutLineBtnRight = styled(OutLineBtn)`
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
	border-left: none;
`;
