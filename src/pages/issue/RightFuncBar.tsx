import { useState } from "react";
import { useGetAssigneeQuery } from "../../services/issuesApi";
import { useGetLabelsQuery } from "../../services/labelsApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
	BellSlashIcon,
	LockIcon,
	PinIcon,
	ArrowRightIcon,
	TrashIcon,
} from "@primer/octicons-react";
import { RepoLabels } from "../../models/LabelsType";
import { UserDefaultData } from "../../models/IssuesType";
import { useParams } from "react-router-dom";
import {
	useUpdateLabelMutation,
	useUpdateAssigneeMutation,
} from "../../services/issueApi";
import PopAssignee from "./popAssignee";
import PopLabel from "./popLabel";
import BarTool from "../../components/commons/BarTool";
import Label from "../../components/commons/tags/Label";

interface RightFuncBarProps {
	labelsData?: RepoLabels[];
	assigneesData?: UserDefaultData[];
	participant?: (
		| { name: string | undefined; img: string | undefined }
		| undefined
	)[];
}

export default function RightFuncBar({
	labelsData,
	assigneesData,
	participant,
}: RightFuncBarProps) {
	const loginUser = useSelector((state: RootState) => state.login);
	const currentContent = useSelector((state: RootState) => state.issue);
	const { number } = useParams();
	const [updateLabel] = useUpdateLabelMutation();
	const [updateAssignee] = useUpdateAssigneeMutation();
	const [popAssigneeVis, setPopAssigneeVis] = useState(false);
	const [popLabelVis, setPopLabelVis] = useState(false);

	const { data: repoAssignees } = useGetAssigneeQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	const { data: repoLabels } = useGetLabelsQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	function assignedList() {
		const assignees = repoAssignees?.filter((item) =>
			assigneesData?.map((assignee) => assignee.login).includes(item.login)
		);
		return (
			assignees?.length !== 0 &&
			assignees?.map((item) => (
				<AssignedUser
					key={item.login}
					name={item.login}
					img={item.avatar_url}
				/>
			))
		);
	}

	function labeledList() {
		const labels = repoLabels?.filter((item) =>
			labelsData?.map((label) => label.name).includes(item.name)
		);
		return (
			labels?.length !== 0 &&
			labels?.map((item) => (
				<Label
					key={item.name}
					labelText={item.name}
					bgColor={item.color}
					padding="s"
				/>
			))
		);
	}

	const itemList = [
		{
			name: "Assignee",
			popVis: popAssigneeVis,
			setPopVis: setPopAssigneeVis,
			popOut: (
				<PopAssignee
					setPopAssigneeVis={setPopAssigneeVis}
					repoAssignees={repoAssignees}
					assigneesData={assigneesData}
					participant={participant}
				/>
			),
			defaultText: "no one-",
			button: "assign yourself",
			onClick: () =>
				updateAssignee({
					owner: loginUser.login,
					repo: localStorage.getItem("repo"),
					number: number,
					assignees: [loginUser.login || ""],
				}),
			setting: true,
			content: assignedList(),
			dataManager: () =>
				updateAssignee({
					owner: loginUser.login,
					repo: localStorage.getItem("repo"),
					number: number,
					assignees: currentContent.assignees,
				}),
		},
		{
			name: "Labels",
			popVis: popLabelVis,
			setPopVis: setPopLabelVis,
			popOut: (
				<PopLabel
					setPopLabelVis={setPopLabelVis}
					repoLabels={repoLabels}
					labelsData={labelsData}
				/>
			),
			defaultText: "None-yet",
			setting: true,
			content: labeledList(),
			dataManager: () =>
				updateLabel({
					owner: loginUser.login,
					repo: localStorage.getItem("repo"),
					number: number,
					labels: currentContent.labels,
				}),
		},
		{ name: "Projects", defaultText: "None-yet", setting: true },
		{ name: "Milestone", defaultText: "No milestone", setting: true },
		{
			name: "Development",
			defaultText: "Shows branches and pull requests linked to this issue.",
			setting: false,
		},
	];

	const IconList = [
		{ icon: <LockIcon />, name: "Lock conversation" },
		{ icon: <PinIcon />, name: "Pin issue" },
		{ icon: <ArrowRightIcon />, name: "Transfer issue" },
		{ icon: <TrashIcon />, name: "Delete issue" },
	];

	return (
		<>
			<div className="L:w-[240px] XL:w-[256px]">
				{itemList.map((item, index) => (
					<BarTool
						key={index}
						name={item.name}
						popVis={item.popVis}
						setPopVis={item.setPopVis}
						popOut={item.popOut}
						setting={item.setting}
						defaultText={item.defaultText}
						button={item.button}
						content={item.content}
						onClick={item.onClick}
						dataManager={item.dataManager}
					/>
				))}
				<div className="relative w-[100%] h-[auto] min-h-[80px] py-4 border-0 border-b border-[#d1d5da] border-solid text-xs text-[#57606a]">
					<button className="flex w-[100%] justify-between items-center  cursor-pointer group ">
						<p className=" font-medium group-hover:text-[#0969da">
							Notifications
						</p>
						<div className={`group-hover:text-[#0969da]`}>Customize</div>
					</button>
					<button className="flex justify-center items-center my-2 w-[100%] h-[30px] border border-[#d1d5da] border-solid rounded-md font-bold text-[#24292f] bg-[#f6f8fa]">
						<BellSlashIcon fill="#57606a" />
						<p className="ml-2">Unsubcribe</p>
					</button>
					<p>
						You’re receiving notifications because you’re watching this
						repository.
					</p>
				</div>
				<div className="relative w-[100%] h-[auto] min-h-[80px] py-4 border-0 border-b border-[#d1d5da] border-solid text-xs text-[#57606a]">
					<button className="flex w-[100%] justify-between items-center  cursor-pointer group ">
						<p className=" font-medium group-hover:text-[#0969da]">
							{participant?.length} participants
						</p>
					</button>
					<div className="flex mt-2">
						{participant?.map((item) => (
							<img
								key={item?.name}
								className="w-7 h-7 mr-1 rounded-[100%]"
								src={item?.img}
							/>
						))}
					</div>
				</div>
				<div className="relative w-[100%] h-[auto] min-h-[80px] py-4 border-0  border-[#d1d5da] border-solid text-xs text-[#57606a]">
					{IconList.map((item, index) => (
						<button
							key={index}
							className="flex w-[100%] mb-4 text-[#24292f] font-bold cursor-pointer hover:text-[#0969da]"
						>
							{item.icon}
							<p className="ml-2">{item.name}</p>
						</button>
					))}
				</div>
			</div>
		</>
	);
}

interface AssignedUserProp {
	name: string;
	img: string;
}

function AssignedUser({ name, img }: AssignedUserProp) {
	return (
		<button className="flex items-center mt-2 w-[100%] text-xs font-bold cursor-pointer hover:text-[#0969da]">
			<img src={img} className="w-5 h-5 mr-2 rounded-full"></img>
			{name}
		</button>
	);
}
