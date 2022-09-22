import styled from "styled-components";
import NormalBtn from "./NormalBtn";
import LabelBar from "./LabelBar";
import {
	TagIcon,
	MilestoneIcon,
	SearchIcon,
	TriangleDownIcon,
} from "@primer/octicons-react";

export default function Labels() {
	const initialLabel = [{ labelText: "bug", bgColor: "#d73a4a" }];
	return (
		<>
			<Wrapper>
				<FunctionBar>
					<DoubleBtn>
						<OutLineBtnLeft>
							<TagIcon /> <div>Labels</div>
						</OutLineBtnLeft>
						<OutLineBtnRight>
							<MilestoneIcon /> <div>Milestone</div>
						</OutLineBtnRight>
					</DoubleBtn>
					<SearchBar>
						<IconWrapper>
							<SearchIcon fill="#57606a" />
						</IconWrapper>
						<SearchInput placeholder="Search all labels" />
					</SearchBar>
					<NormalBtn text="New label" />
				</FunctionBar>
				<ListBox>
					<ListHeader>
						<LabelsCount>12 labels</LabelsCount>
						<SortBtn>
							Sort <TriangleDownIcon />
						</SortBtn>
					</ListHeader>
					<LabelBar labelText="bug" bgColor="#d73a4a" />
				</ListBox>
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	padding: 24px 32px;
	margin: auto;
	max-width: 1280px;
	@media screen and (max-width: 1011px) {
		padding: 24px 24px;
	}
	@media screen and (max-width: 767px) {
		padding: 24px 16px;
	}
`;

const FunctionBar = styled.div`
	margin-bottom: 24px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	@media screen and (max-width: 767px) {
		& > *:first-child {
			margin-bottom: 16px;
		}
	}
`;

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

const ListBox = styled.div`
	width: 100%;
	height: 300px;
`;

const ListHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	width: 100%;
	height: 53px;
	border: solid 1px #d1d5da;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	background-color: #f6f8fa;
`;

const LabelsCount = styled.p`
	font-size: 14px;
	font-weight: 600;
`;

const SortBtn = styled.button`
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #57606a;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
`;
