import { RepoLabels } from "../../models/LabelsType";
import { UserDefaultData } from "../../models/IssuesType";
import { useNavigate } from "react-router-dom";
import { timeCalc, timeCalc2 } from "../../utils/utils";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Label from "../../components/commons/tags/Label";
import {
	IssueOpenedIcon,
	CommentIcon,
	IssueClosedIcon,
	SkipIcon,
} from "@primer/octicons-react";

interface IssueBarProp {
	title: string;
	labels: RepoLabels[];
	number: number;
	user: UserDefaultData;
	assignees: UserDefaultData[];
	comments: number;
	iconState?: string;
	stateReason?: string | null;
	time: string;
	body: string;
}

export default function IssueBar({
	title,
	labels,
	number,
	user,
	assignees,
	comments,
	iconState,
	stateReason,
	time,
	body,
}: IssueBarProp) {
	const navigate = useNavigate();
	const loginUser = useSelector((state: RootState) => state.login);
	return (
		<>
			<div className="flex px-4 py-2 border-0 border-b border-[#d1d5da] border-solid last:rounded-b-[6px] hover:bg-[#f6f8fa] M:last:border-b-0">
				<div className="mr-4 pt-[2px] hidden L:inline">
					<input
						className="w-3 h-3 border border-[#57606a] border-solid rounded-[2px]"
						type="checkbox"
					></input>
				</div>
				<div className="mr-2">
					{iconState === "open" ? (
						<IssueOpenedIcon fill="#1a7f37" />
					) : stateReason === "completed" ? (
						<IssueClosedIcon fill="#8250df" />
					) : (
						<SkipIcon fill="#57606a" />
					)}
				</div>

				<div className="w-[100%] items-center L:flex L:flex-wrap relative">
					<button className="mb-[-2px] group cursor-pointer ">
						<div className="hidden group-hover:block absolute p-4 w-[340px] h-[auto] border border-[#d1d5da] border-solid rounded-[6px] bg-white bottom-12">
							<div className="flex text-xs text-[#57606a]">
								<p>
									<span className="underline hover:text-[#0969da] mr-1">
										{loginUser.login || "user"}/
										{localStorage.getItem("repo") || "repo"}
									</span>
									on {timeCalc2(time)}
								</p>
							</div>
							<div className="flex pt-2 items-center">
								{iconState === "open" ? (
									<IssueOpenedIcon fill="#1a7f37" />
								) : stateReason === "completed" ? (
									<IssueClosedIcon fill="#8250df" />
								) : (
									<SkipIcon fill="#57606a" />
								)}
								<p className="text-sm font-bold ml-1">{title}</p>
								<p className="text-sm text-[#57606a] ml-1">#{number}</p>
							</div>
							<div
								className={`h-[auto] flex-wrap mb-4 ${
									body === null ? "hidden" : "flex"
								}`}
							>
								<p className="pl-5 text-sm text-[#57606a]">
									{`${
										body === null || body.length < 80
											? body
											: body.substring(0, 80) + "..."
									}`}
								</p>
							</div>
							<div className="pl-4 ">
								{labels.map((label) => (
									<Label
										key={label.id}
										labelText={label.name}
										bgColor={label.color}
										padding="s"
									/>
								))}
							</div>
						</div>
						<button onClick={() => navigate(`/issues/${number}`)}>
							<strong className="hover:text-[#0969da] cursor-pointer">
								{title}
							</strong>
						</button>
					</button>

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
						#{number} opened {timeCalc(time)} by {user.login}
					</p>
				</div>
				<div className=" invisible flex mt-1 space-x-[-15px] hover:space-x-1 M:visible ">
					{assignees.map((assignee) => (
						<div key={assignee.id} className="w-5 h-5 last:ml-1 transition-all">
							<img className="rounded-xl" src={assignee.avatar_url}></img>
						</div>
					))}
				</div>
				<div
					className={`invisible flex text-xs font-medium text-[#57606a] ml-10 mt-1 ${
						comments === 0 ? "M:invisible" : "M:visible"
					}`}
				>
					<CommentIcon />
					<p className="ml-1">{comments}</p>
				</div>
			</div>
		</>
	);
}
