import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useGetLabelsQuery } from "../../services/labelsApi";
import { useGetIssuesQuery } from "../../services/issuesApi";
import { handleIssuesNum } from "../../app/issuesSlice";
import DoubleIconBtn from "../../components/commons/buttons/DoubleIconBtn";
import NormalBtn from "../../components/commons/buttons/NormalBtn";
import IssueBar from "./IssueBar";
import PopFilter from "./PopFilter";
import PopSort from "./PopSort";
import PopLabel from "./PopLabel";
import PopAssignee from "./PopAssignee";
import Loader from "../../components/Loader";

import {
	TagIcon,
	MilestoneIcon,
	TriangleDownIcon,
	IssueOpenedIcon,
	CheckIcon,
	XIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from "@primer/octicons-react";

import {
	handleIssueStatus,
	resetQuery,
	nextPage,
	prevPage,
} from "../../app/issuesSlice";

const stateList = [
	{ stateName: "open", icon: <IssueOpenedIcon />, btnText: "Open" },
	{ stateName: "closed", icon: <CheckIcon />, btnText: "Closed" },
];

export default function Issues() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentState = useSelector((state: RootState) => state.queries);
	const loginUser = useSelector((state: RootState) => state.login);

	const [popFilterVis, setPopFilterVis] = useState(false);
	const [popSortVis, setPopSortVis] = useState(false);
	const [popLabelVis, setPopLabelVis] = useState(false);
	const [popAssigneeVis, setPopAssigneeVis] = useState(false);
	const [inputValue, setInputValue] = useState("");

	if (!loginUser.login) {
		return <Navigate to="/" replace />;
	}

	const { data: issuesData, isSuccess: issuesSuccess } = useGetIssuesQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
		query: {
			issueStatus: currentState.issueStatus
				? `state=${currentState.issueStatus}&`
				: "",
			labels:
				currentState.labels?.length !== 0
					? `labels=${currentState.labels?.join()}&`
					: "",
			assignee: currentState.assignee
				? `assignee=${currentState.assignee}&`
				: "",
			sort: currentState.sort ? `sort=${currentState.sort}&` : "",
			filters: currentState.filters
				? `${currentState.filters}${loginUser.login}&`
				: "",
			page: currentState.page ? `page=${currentState.page}&` : 1,
		},
	});

	const { data: labelsData, isSuccess: labelsSuccess } = useGetLabelsQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	function handleInputText() {
		let text = "is:issue";
		if (currentState.issueStatus === "") {
			text += ` is:open`;
		} else {
			text += ` is:${currentState.issueStatus}`;
		}

		if (currentState.filters === "creator=") {
			text += ` author:@me`;
		} else if (currentState.filters === "assignee=") {
			text += ` assignee:@me`;
		} else if (currentState.filters === "mentioned=") {
			text += ` metions:@me`;
		}

		if (currentState.labels?.length !== 0) {
			const allLabels = currentState.labels?.reduce((acc, cur) => {
				acc += ` label:${cur}`;
				return acc;
			}, "");
			text += allLabels;
		}

		if (currentState.sort !== "") {
			text += ` is:${currentState.sort}`;
		}

		if (currentState.assignee !== "") {
			text += ` assignee:${currentState.assignee}`;
		}

		return text;
	}

	useEffect(() => setInputValue(handleInputText()), [currentState]);
	useEffect(() => {
		dispatch(handleIssuesNum(issuesData?.length || 0));
	});

	function defaultState() {
		return (
			currentState.issueStatus === "open" &&
			currentState.labels?.length === 0 &&
			currentState.assignee === "" &&
			currentState.sort === "" &&
			currentState.filters === ""
		);
	}

	const filtersList = [
		{
			btnName: "Label",
			visState: popLabelVis,
			setVisState: setPopLabelVis,
			component: <PopLabel setPopLabelVis={setPopLabelVis} />,
		},
		{
			btnName: "Assignee",
			visState: popAssigneeVis,
			setVisState: setPopAssigneeVis,
			component: <PopAssignee setPopAssigneeVis={setPopAssigneeVis} />,
		},
		{
			btnName: "Sort",
			visState: popSortVis,
			setVisState: setPopSortVis,
			component: <PopSort setPopSortVis={setPopSortVis} />,
		},
	];

	if (!issuesSuccess || !labelsSuccess) {
		return <Loader />;
	}

	return (
		<div className="w-[100%] h-[auto] max-w-[1280px]   m-[auto] M:relative">
			<section className="flex px-4 flex-wrap justify-between items-center w-[100%] mt-6 M:relative L:flex-nowrap L:px-6 XL:px-8">
				<div className="flex relative w-[100%] order-3 mt-6 text-[14px] font-[500] L:order-none L:mt-0 L:mr-4">
					<button
						className="w-[90px] h-8 rounded-l-[6px] border border-[#d1d5da] border-solid bg-[#f6f8fa] flex items-center justify-between px-[14px] cursor-pointer"
						onClick={() => setPopFilterVis(!popFilterVis)}
					>
						Filters
						<TriangleDownIcon />
					</button>
					<input
						className="w-[100%] h-8 font-normal text-[#57606a] rounded-r-[6px] border border-l-0 border-[#d1d5da] border-solid bg-[#f6f8fa] flex items-center px-[14px] focus:border-[#0969da] focus:border-2 focus:bg-[#ffffff]"
						value={inputValue}
					></input>
					<div
						className={`order-first z-[1] ${popFilterVis ? "block" : "hidden"}`}
					>
						<PopFilter setPopFilterVis={setPopFilterVis} />
					</div>
				</div>
				<div className="mr-[8px]">
					<DoubleIconBtn
						icon1={<TagIcon />}
						text1="Labels"
						icon2={<MilestoneIcon />}
						text2="Milestones"
						num1={labelsData?.length}
						num2={0}
						onClick1={() => navigate("/labels")}
					/>
				</div>
				<button>
					<div className="L:hidden">
						<NormalBtn
							text="New"
							width="64px"
							colorType="green"
							onClick={() => navigate("new")}
						/>
					</div>
					<div className="hidden L:inline">
						<NormalBtn
							text="New issue"
							width="100px"
							colorType="green"
							onClick={() => navigate("new")}
						/>
					</div>
				</button>
			</section>
			<section className={defaultState() ? "hidden" : "block"}>
				<button
					className="flex items-center group w-[100%] h-[auto] mt-4 ml-4 text-[#57606a] text-sm font-black cursor-pointer L:ml-6 XL:ml-8"
					onClick={() => dispatch(resetQuery())}
				>
					<div className="flex w-4 h-4 mr-2 bg-[#57606a] rounded group-hover:bg-[#0969da]">
						<XIcon fill="white" />
					</div>
					<p className="group-hover:text-[#0969da] ">
						Clear current search query, filters, and sorts
					</p>
				</button>
			</section>
			<section
				className={`flex px-4 text-[14px] mt-4 L:px-6 XL:absolute ${
					defaultState() ? "XL:top-[48px]" : "XL:top-[84px]"
				} XL:left-[54px]`}
			>
				{stateList.map((item) => (
					<button
						key={item.stateName}
						className={`flex w-[auto] items-center mr-4 cursor-pointer ${
							currentState.issueStatus === item.stateName
								? "text-black font-semibold"
								: "text-[#57606a]"
						}`}
						onClick={() => dispatch(handleIssueStatus(item.stateName))}
					>
						<div className="mr-2 flex  items-center ">{item.icon}</div>
						{item.btnText}
					</button>
				))}
			</section>
			<section className="mt-4 M:mx-4 L:mx-6 XL:mx-8">
				<header className="flex items-center p-4 border border-[#d1d5da] border-solid bg-[#f6f8fa] text-[14px] text-[#57606a] M:rounded-t-[6px]">
					<div className="hidden M:inline">
						<input
							className="w-3 h-3 border border-[#57606a] border-solid rounded-[2px]"
							type="checkbox"
						></input>
					</div>
					<div className="flex w-[100%] justify-between  M:justify-start XL:justify-end">
						{filtersList.map((item) => (
							<FilterTypeButton
								key={item.btnName}
								btnName={item.btnName}
								visState={item.visState}
								setVisState={item.setVisState}
								component={item.component}
							/>
						))}
					</div>
				</header>
				<div className=" rounded-b-[6px] M:border M:border-t-0 M:border-[#d1d5da] M:border-solid ">
					{issuesData?.length === 0 ? (
						<div className="flex flex-wrap justify-center py-20 text-center">
							<div className="w-[100%] mb-8">
								<IssueOpenedIcon fill="#57606a" size={24} />
							</div>
							<h1 className="w-[100%] mb-5 text-2xl font-black">
								No results matched your search.
							</h1>
							<p className="w-[100%] text-[#57606a]">
								You could search
								<span className="text-[#0969da]"> all of GitHub</span> or try an
								<span className="text-[#0969da]">advanced search.</span>
							</p>
						</div>
					) : (
						issuesData?.map((item) => (
							<IssueBar
								key={item.id}
								title={item.title}
								labels={item.labels}
								number={item.number}
								user={item.user}
								assignees={item.assignees}
								comments={item.comments}
								iconState={item.state}
								stateReason={item.state_reason}
								time={item.created_at}
								body={item.body}
							/>
						))
					)}
				</div>
			</section>
			<section className="flex justify-center items-center mt-4 h-10 text-xs">
				<button
					className={`flex items-center w-[auto]h-[auto] p-2 mr-4  rounded-md ${
						currentState.page === 1
							? "text-[#57606a]"
							: "text-[#0969da] hover:border hover:border-[#d1d5da] hover:border-solid cursor-pointer"
					}`}
					onClick={() => dispatch(prevPage())}
				>
					<ChevronLeftIcon /> <p className="ml-1">Previous</p>
				</button>
				<p>{currentState.page}</p>
				<button
					className={`flex items-center w-[auto]h-[auto] p-2 ml-4  rounded-md ${
						issuesData?.length === 0
							? "text-[#57606a]"
							: "text-[#0969da] hover:border hover:border-[#d1d5da] hover:border-solid cursor-pointer"
					}`}
					disabled={issuesData?.length === 0}
					onClick={() => dispatch(nextPage())}
				>
					<p className="mr-1">Next</p> <ChevronRightIcon />
				</button>
			</section>
		</div>
	);
}

interface FilterTypeButtonProps {
	btnName: string;
	visState: boolean;
	setVisState: Dispatch<SetStateAction<boolean>>;
	component: JSX.Element;
}

function FilterTypeButton({
	visState,
	setVisState,
	btnName,
	component,
}: FilterTypeButtonProps) {
	return (
		<div className="relative">
			<button
				className="px-4 flex items-center hover:cursor-pointer"
				onClick={() => setVisState(!visState)}
			>
				<p>{btnName}</p>
				<div className="hidden M:inline">
					<TriangleDownIcon />
				</div>
			</button>
			<div className={` ${visState ? "block" : "hidden"}`}>{component}</div>
		</div>
	);
}
