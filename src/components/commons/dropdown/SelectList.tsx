import styled from "styled-components";

interface ListProps {
	right: string;
	top: string;
	listitems: string[];
	isShown: boolean;
}

export default function SelectList({
	right,
	top,
	listitems,
	isShown,
}: ListProps) {
	return (
		<>
			<Wrapper right={right} top={top} isShown={isShown}>
				<ListBox>
					{listitems.map((item, index) => (
						<LinkText key={index}>{item}</LinkText>
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

const ListBox = styled.div`
	position: relative;
	width: 160px;
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

const LinkText = styled.button`
	width: 100%;
	height: 29px;
	padding-left: 16px;
	font-size: 14px;
	cursor: pointer;
	:hover {
		color: #ffffff;
		background-color: #0969da;
	}
`;
