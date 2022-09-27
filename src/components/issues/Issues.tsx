import { useState } from "react";
import DoubleIconBtn from "../../commons/DoubleIconBtn";
import NormalBtn from "../../commons/NormalBtn";
import IssueBar from "./IssueBar";
import PopFilter from "./PopFilter";
import PopSort from "./PopSort";
import PopLabel from "./PopLabel";
import PopAssignee from "./PopAssignee";

import {
	TagIcon,
	MilestoneIcon,
	TriangleDownIcon,
	IssueOpenedIcon,
	CheckIcon,
} from "@primer/octicons-react";

export default function Issues() {
	const [popFilterVis, setPopFilterVis] = useState(false);
	const [popSortVis, setPopSortVis] = useState(false);
	const [popLabelVis, setPopLabelVis] = useState(false);
	const [popAssigneeVis, setPopAssigneeVis] = useState(false);

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
					<div className="w-[100%] h-8 rounded-r-[6px] border border-[#d1d5da] border-solid bg-[#f6f8fa] flex items-center px-[14px]">
						<input className="w-[100%]"></input>
					</div>
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
					/>
				</div>
				<button>
					<div className="L:hidden">
						<NormalBtn text="New" width="64px" colorType="green" />
					</div>
					<div className="hidden L:inline">
						<NormalBtn text="New issue" width="100px" colorType="green" />
					</div>
				</button>
			</section>
			<section className="flex px-4 text-[14px] mt-6 L:px-6 XL:absolute XL:top-10 XL:left-[54px] ">
				<button className="flex w-[auto] items-center mr-4">
					<div className="mr-2 flex  items-center ">
						<IssueOpenedIcon />
					</div>
					4 Open
				</button>
				<button className="flex w-[auto] items-center ">
					<div className="mr-2 flex  items-center ">
						<CheckIcon />
					</div>
					2 Closed
				</button>
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
						<div className="relative">
							<button
								className="px-4 flex items-center hover:cursor-pointer"
								onClick={() => setPopLabelVis(!popLabelVis)}
							>
								<p>Label</p>
								<div className="hidden M:inline">
									<TriangleDownIcon />
								</div>
							</button>
							<div className={` ${popLabelVis ? "block" : "hidden"}`}>
								<PopLabel setPopLabelVis={setPopLabelVis} />
							</div>
						</div>
						<div className="relative">
							<button
								className=" px-4 flex items-center hover:cursor-pointer "
								onClick={() => setPopAssigneeVis(!popAssigneeVis)}
							>
								<p>Assignee</p>
								<div className="hidden M:inline">
									<TriangleDownIcon />
								</div>
							</button>
							<div className={` ${popAssigneeVis ? "block" : "hidden"}`}>
								<PopAssignee setPopAssigneeVis={setPopAssigneeVis} />
							</div>
						</div>
						<div className="relative">
							<button
								className=" px-4 flex items-center hover:cursor-pointer "
								onClick={() => setPopSortVis(!popSortVis)}
							>
								<p>Sort</p>
								<div className="hidden M:inline">
									<TriangleDownIcon />
								</div>
							</button>
							<div className={` ${popSortVis ? "block" : "hidden"}`}>
								<PopSort setPopSortVis={setPopSortVis} />
							</div>
						</div>
					</div>
				</header>
				<div className="w rounded-b-[6px] M:border M:border-t-0 M:border-[#d1d5da] M:border-solid ">
					<IssueBar />
					<IssueBar />
					<IssueBar />
					<IssueBar />
					<IssueBar />
				</div>
			</section>
		</div>
	);
}
