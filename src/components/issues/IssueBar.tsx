import { IssueOpenedIcon, CommentIcon } from "@primer/octicons-react";
import { RepoLabels } from "../../models/LabelsType";
import { UserDefaultData } from "../../models/IssuesType";
import Label from "../labels/Label";

interface IssueBarProp {
	title: string;
	labels: RepoLabels[];
	number: number;
	user: UserDefaultData;
	assignees: UserDefaultData[];
	comments: number;
}

export default function IssueBar({
	title,
	labels,
	number,
	user,
	assignees,
	comments,
}: IssueBarProp) {
	return (
		<>
			<div className="flex px-4 py-2 border-0 border-b border-[#d1d5da] border-solid last:rounded-b-[6px] cursor-pointer hover:bg-[#f6f8fa] M:last:border-b-0">
				<div className="mr-4 pt-[2px] hidden M:inline">
					<input
						className="w-3 h-3 border border-[#57606a] border-solid rounded-[2px]"
						type="checkbox"
					></input>
				</div>
				<div className="mr-2">
					<IssueOpenedIcon fill="#1a7f37" />
				</div>

				<div className="w-[100%] items-center L:flex L:flex-wrap">
					<p className="mb-[-2px] ">
						<strong>{title}</strong>
					</p>

					<div className="mb-1 L:ml-2">
						{labels.map((label) => (
							<Label
								key={label.id}
								labelText={label.name}
								bgColor={label.color}
								padding="s"
							/>
						))}
					</div>
					<p className="text-[#57606a] text-xs w-[100%] L:mt-1">
						#{number} opened 9 days ago by {user.login}
					</p>
				</div>
				<div className="flex mt-1 space-x-[-10px] hover:space-x-1">
					{assignees.map((assignee) => (
						<div key={assignee.id} className="w-5 h-5 ">
							<img className="rounded-xl" src={assignee.avatar_url}></img>
						</div>
					))}
				</div>
				<div
					className={`flex text-xs font-medium text-[#57606a] ml-10 mt-1 ${
						comments === 0 ? "invisible" : "visible"
					}`}
				>
					<CommentIcon />
					<p className="ml-1">{comments}</p>
				</div>
			</div>
		</>
	);
}
