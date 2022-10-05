import { useState } from "react";
import { useGetAssigneeQuery } from "../../services/issuesApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import PopAssignee from "./PopAssignee";
import PopLabel from "./PopLabel";
import BarTool from "./BarTool";
import Label from "../labels/Label";

export default function RightFuncBar() {
	const [popAssigneeVis, setPopAssigneeVis] = useState(false);
	const [popLabelVis, setPopLabelVis] = useState(false);

	const itemList = [
		{
			name: "Assignee",
			popVis: popAssigneeVis,
			setPopVis: setPopAssigneeVis,
			popOut: <PopAssignee setPopAssigneeVis={setPopAssigneeVis} />,
			defaultText: "no one-",
			button: "assign yourself",
			setting: true,
		},
		{
			name: "Labels",
			popVis: popLabelVis,
			setPopVis: setPopLabelVis,
			popOut: <PopLabel setPopLabelVis={setPopLabelVis} />,
			defaultText: "None-yet",
			setting: true,
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
						// content={item.content}
					/>
				))}
			</div>
		</>
	);
}

function AssignedUser() {
	return (
		<button className="flex items-center w-[100%] text-xs font-bold cursor-pointer hover:text-[#0969da]">
			<img
				src="https://avatars.githubusercontent.com/u/64196504?v=4"
				className="w-5 h-5 mr-2 rounded-full"
			></img>
			athenacheng15
		</button>
	);
}
