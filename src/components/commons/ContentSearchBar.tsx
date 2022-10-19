import styled from "styled-components";
import { SearchIcon } from "@primer/octicons-react";

export default function ContentSearchBar() {
	return (
		<>
			<SearchBar>
				<IconWrapper>
					<SearchIcon fill="#57606a" />
				</IconWrapper>
				<SearchInput placeholder="Search all labels" />
			</SearchBar>
		</>
	);
}

const IconWrapper = styled.div`
	position: absolute;
	top: 2px;
	left: 12px;
`;

const SearchBar = styled.div`
	position: relative;
	width: auto;
	height: auto;
	display: flex;
	flex-grow: 1;
	margin-right: 59px;
	@media screen and (max-width: 767px) {
		width: 100%;
		order: 1;
		flex: auto;
	}
`;

const SearchInput = styled.input`
	width: 320px;
	height: 32px;
	border: solid 1px #d1d5da;
	border-radius: 6px;
	padding-left: 32px;
	font-size: 14px;
	color: #57606a;
	background-color: #f6f8fa;
`;
