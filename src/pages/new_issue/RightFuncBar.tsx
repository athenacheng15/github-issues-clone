import { useState } from "react";
import { useGetAssigneeQuery } from "../../services/issuesApi";
import { useGetLabelsQuery } from "../../services/labelsApi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { handleAssignees } from "../../app/newIssueSlice";
import PopAssignee from "../../components/commons/dropdown/PopAssignee";
import PopLabel from "../../components/commons/dropdown/PopLabel";
import BarTool from "../../components/commons/BarTool";
import Label from "../../components/commons/tags/Label";

export default function RightFuncBar() {
	const loginUser = useSelector((state: RootState) => state.login);
	const currentContent = useSelector((state: RootState) => state.contents);
	const dispatch = useDispatch();
	const [popAssigneeVis, setPopAssigneeVis] = useState(false);
	const [popLabelVis, setPopLabelVis] = useState(false);

	const { data: assigneesData } = useGetAssigneeQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	const { data: labelsData } = useGetLabelsQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	function assignedList() {
		const assignees = assigneesData?.filter((item) =>
			currentContent.assignees.includes(item.login)
		);
		return (
			currentContent.assignees.length !== 0 &&
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
		const labels = labelsData?.filter((item) =>
			currentContent.labels.includes(item.name)
		);
		return (
			currentContent.labels.length !== 0 &&
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
					data={assigneesData}
				/>
			),
			defaultText: "no one-",
			button: "assign yourself",
			onClick: () => dispatch(handleAssignees(loginUser.login || "")),
			setting: true,
			content: assignedList(),
		},
		{
			name: "Labels",
			popVis: popLabelVis,
			setPopVis: setPopLabelVis,
			popOut: <PopLabel setPopLabelVis={setPopLabelVis} data={labelsData} />,
			defaultText: "None-yet",
			setting: true,
			content: labeledList(),
		},
		{ name: "Projects", defaultText: "None-yet", setting: true },
		{ name: "Milestone", defaultText: "No milestone", setting: true },
		{
			name: "Development",
			defaultText: "Shows branches and pull requests linked to this issue.",
			setting: false,
		},
		{
			name: "Helpful resources",
			defaultText: "",
			link: "GitHub Community Guidelines",
			href: "https://docs.github.com/en/site-policy/github-terms/github-community-guidelines",
			setting: false,
		},
	];
	return (
		<>
			<div className="L:w-[240px] XL:w-[256px] h-[500px]">
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
						link={item.link}
						href={item.href}
						content={item.content}
						onClick={item.onClick}
					/>
				))}
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
