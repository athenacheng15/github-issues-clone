import { useState } from "react";
import { useGetAssigneeQuery } from "../../services/issuesApi";
import { useGetLabelsQuery } from "../../services/labelsApi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { handleAssignees } from "../../app/newIssueSlice";
import PopAssignee from "./popAssignee";
import PopLabel from "./popLabel";
import BarTool from "../../commons/BarTool";
import Label from "../labels/Label";
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

interface RightFuncBarProps {
	labelsData?: RepoLabels[];
	assigneesData?: UserDefaultData[];
}

export default function RightFuncBar({
	labelsData,
	assigneesData,
}: RightFuncBarProps) {
	const [popAssigneeVis, setPopAssigneeVis] = useState(false);
	const [popLabelVis, setPopLabelVis] = useState(false);
	const currentContent = useSelector((state: RootState) => state.issue);
	const dispatch = useDispatch();
	const { number } = useParams();
	const [updateLabel] = useUpdateLabelMutation();
	const [updateAssignee] = useUpdateAssigneeMutation();

	const { data: repoAssignees } = useGetAssigneeQuery({
		owner: "athenacheng15",
		repo: "issue_test",
	});

	const { data: repoLabels } = useGetLabelsQuery({
		owner: "athenacheng15",
		repo: "issue_test",
	});

	function assignedList() {
		const assignees = repoAssignees?.filter((item) =>
			assigneesData?.map((assignee) => assignee.login).includes(item.login)
		);
		return assignees?.map((item) => (
			<AssignedUser key={item.login} name={item.login} img={item.avatar_url} />
		));
	}

	function labeledList() {
		const labels = repoLabels?.filter((item) =>
			labelsData?.map((label) => label.name).includes(item.name)
		);
		return labels?.map((item) => (
			<Label
				key={item.name}
				labelText={item.name}
				bgColor={item.color}
				padding="s"
			/>
		));
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
				/>
			),
			defaultText: "no one-",
			button: "assign yourself",
			onClick: () => dispatch(handleAssignees("athenacheng15")),
			setting: true,
			content: assignedList(),
			dataManager: () =>
				updateAssignee({
					owner: "athenacheng15",
					repo: "issue_test",
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
					owner: "athenacheng15",
					repo: "issue_test",
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
							{assigneesData?.length} participants
						</p>
					</button>
					<div className="flex mt-2">
						{assigneesData?.map((item) => (
							<img
								key={item.login}
								className="w-7 h-7 mr-1 rounded-[100%]"
								src={item.avatar_url}
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