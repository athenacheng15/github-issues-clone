import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../app/store";
import NormalBtn from "../../components/commons/buttons/NormalBtn";
import LabelBar from "./LabelBar";
import SelectBox from "../../components/commons/dropdown/SelectBox";
import DoubleIconBtn from "../../components/commons/buttons/DoubleIconBtn";
import ContentSearchBar from "../../components/commons/ContentSearchBar";
import NewLabel from "./NewLabel";
import Loader from "../../components/Loader";
import {
	TagIcon,
	MilestoneIcon,
	TriangleDownIcon,
} from "@primer/octicons-react";

import { useGetLabelsQuery } from "../../services/labelsApi";

export default function Labels() {
	const loginUser = useSelector((state: RootState) => state.login);
	const [sortListVis, setSortListVis] = useState(false);
	const [newLabelVis, setNewLabelVis] = useState(false);

	const { data, isSuccess } = useGetLabelsQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	if (!loginUser.login) {
		return (
			<>
				<Navigate to="/" replace />
			</>
		);
	}

	if (!isSuccess) {
		return <Loader />;
	}

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
					<BtnWrapper onClick={() => setNewLabelVis(!newLabelVis)}>
						<NormalBtn text="New label" width="100px" colorType="green" />
					</BtnWrapper>
				</FunctionBar>
				<NewLabel isShown={newLabelVis} setNewLabelVis={setNewLabelVis} />
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
							bgColor={item.color}
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

const BtnWrapper = styled.button`
	width: auto;
	height: auto;
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
