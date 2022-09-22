import styled from "styled-components";

interface Props {
	icon1: JSX.Element;
	text1: string;
	icon2: JSX.Element;
	text2: string;
}

export default function DoubleIconBtn({ icon1, text1, icon2, text2 }: Props) {
	return (
		<>
			<DoubleBtn>
				<OutLineBtnLeft>
					{icon1} <div>{text1}</div>
				</OutLineBtnLeft>
				<OutLineBtnRight>
					{icon2} <div>{text2}</div>
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
