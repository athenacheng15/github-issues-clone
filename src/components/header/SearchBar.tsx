import styled from "styled-components";

interface Props {
	width: string;
	max: string;
}

export default function SearchBar({ width, max }: Props) {
	return (
		<Wrapper width={width} max={max}>
			<SearchInput placeholder="Search or jump to..." />
			<SlashBtn>/</SlashBtn>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: ${(props: Props) => props.width};
	max-width: ${(props: Props) => props.max};
	height: 30px;
	border: solid 1px rgb(87, 96, 106);
	border-radius: 6px;
	margin: 0 16px;
	padding-left: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: width 0.5s ease-in-out, background-color 0.01s ease-in-out;
	background-color: transparent;
	:focus-within {
		width: 100%;
		background-color: #ffffff;
	}
`;

const SearchInput = styled.input`
	font-size: 14px;
	color: rgb(209, 213, 218);
	border: none;
	background-color: transparent;
	:focus-within {
		background-color: #ffffff;
		color: rgb(87, 96, 106);
		& + button {
			display: none;
		}
	}
`;

const SlashBtn = styled.button`
	width: 20px;
	height: 20px;
	margin-right: 4px;
	border: solid 1px rgb(87, 96, 106);
	border-radius: 3px;
	color: rgb(209, 213, 218);
	background-color: transparent;
	text-align: center;
	font-size: 8px;
	font-weight: 100;
`;
