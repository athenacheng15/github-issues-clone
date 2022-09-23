import styled from "styled-components";
import { useState } from "react";
import NormalBtn from "../../commons/NormalBtn";
import LabelBar from "./LabelBar";
import SelectBox from "../../commons/SelectBox";
import DoubleIconBtn from "../../commons/DoubleIconBtn";
import ContentSearchBar from "../../commons/ContentSearchBar";
import NewLabel from "./NewLabel";
import {
	TagIcon,
	MilestoneIcon,
	TriangleDownIcon,
} from "@primer/octicons-react";

import { useGetLabelsQuery } from "../../services/labelsApi";

export default function Labels() {
	const [sortListVis, setSortListVis] = useState(false);

	const { data, error, isLoading, isFetching, isSuccess } = useGetLabelsQuery({
		user: "athenacheng15",
		repository: "issue_test",
	});

	console.log(data);

	return (
		<>
			<Wrapper>
				<FunctionBar>
					<DoubleIconBtn
						icon1={<TagIcon />}
						text1="Labels"
						icon2={<MilestoneIcon />}
						text2="Milestone"
					/>
					<ContentSearchBar />
					<NormalBtn text="New label" width="100px" colorType="green" />
				</FunctionBar>
				<NewLabel />
				<ListBox>
					<ListHeader>
						<LabelsCount>{data?.length} labels</LabelsCount>
						<SortBtn onClick={() => setSortListVis(!sortListVis)}>
							Sort <TriangleDownIcon />
							<SelectBox textList={sortList} isShown={sortListVis} />
						</SortBtn>
					</ListHeader>
					{data?.map((item) => (
						<LabelBar
							key={item.id}
							id={item.id}
							labelText={item.name}
							bgColor={`#${item.color}`}
							description={item.description}
						/>
					))}
				</ListBox>
			</Wrapper>
		</>
	);
}

const sortList = [
	"Alphabetically",
	"Reverse alphabetically",
	"Most issues",
	"Fewest issues",
];

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

const ListBox = styled.div`
	width: 100%;
	height: auto;
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
	position: relative;
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #57606a;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
`;
