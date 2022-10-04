import { useState } from "react";
import { GearIcon } from "@primer/octicons-react";
import PopAssignee from "./PopAssignee";
import PopLabel from "./PopLabel";
import NormalBtn from "../../commons/NormalBtn";

export default function RightFuncBar() {
	const [popAssigneeVis, setPopAssigneeVis] = useState(false);
	const [popLabelVis, setPopLabelVis] = useState(false);
	const itemList = [
		{
			name: "Assignee",
			defaultText: (
				<>
					<p>no one-</p>
					<a className="cursor-pointer text-[#57606a] hover:text-[#0969da]">
						assign yourself
					</a>
				</>
			),
			setting: true,
		},
		{
			name: "Labels",
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
			defaultText: (
				<a
					className="mt-2 text-xs text-[#0969da] cursor-pointer"
					href="https://docs.github.com/en/site-policy/github-terms/github-community-guidelines"
				>
					GitHub Community Guidelines
				</a>
			),
			setting: false,
		},
	];
	return (
		<>
			<div className="L:w-[240px] XL:w-[256px] h-[500px]">
				{itemList.map((item, index) => (
					<div
						key={index}
						className="relative w-[100%] h-[80px] py-4 border-0 border-b border-[#d1d5da] border-solid "
					>
						<button
							className="flex w-[100%] justify-between cursor-pointer group text-[#57606a]"
							onClick={() => {
								item.name === "Assignee"
									? setPopAssigneeVis(!popAssigneeVis)
									: item.name === "Labels"
									? setPopLabelVis(!popLabelVis)
									: "";
							}}
						>
							<p className="text-xs font-medium group-hover:text-[#0969da]">
								{item.name}
							</p>
							<div
								className={`group-hover:text-[#0969da] ${
									item.setting ? "block" : "hidden"
								}`}
							>
								<GearIcon />
							</div>
						</button>
						<div className=" flex text-xs mt-1">{item.defaultText}</div>

						{item.name === "Assignee" ? (
							<div className={`${popAssigneeVis ? "block" : "hidden"}`}>
								<PopAssignee setPopAssigneeVis={setPopAssigneeVis} />
							</div>
						) : item.name === "Labels" ? (
							<div className={`${popLabelVis ? "block" : "hidden"}`}>
								<PopLabel setPopLabelVis={setPopLabelVis} />
							</div>
						) : (
							""
						)}
					</div>
				))}
			</div>
			<div className="L:hidden">
				<NormalBtn text="Submit new issue" width="100%" colorType="green" />
			</div>
		</>
	);
}
