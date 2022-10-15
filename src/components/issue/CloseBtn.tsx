import { useState } from "react";
import { useParams } from "react-router-dom";
import {
	IssueClosedIcon,
	IssueReopenedIcon,
	SkipIcon,
	TriangleDownIcon,
	CheckIcon,
} from "@primer/octicons-react";
import {
	useEditIssueStateMutation,
	useCreateCommentMutation,
} from "../../services/issueApi";
import { resetAll } from "../../app/issueSlice";

interface CloseBtnProp {
	state?: string;
	body: string;
	setBodyValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function CloseBtn({ state, body, setBodyValue }: CloseBtnProp) {
	const [reason, setReason] = useState(
		state === "open" ? "completed" : "reopened"
	);
	const [editState, setEditState] = useState(
		state === "open" ? "closed" : "open"
	);
	const [optionVis, setOptionVis] = useState(false);
	const [editIssueState] = useEditIssueStateMutation();
	const [createComment] = useCreateCommentMutation();
	const { number } = useParams();

	const completed = {
		name: "completed",
		icon: <IssueClosedIcon fill="#8250df" />,
		text: "Close as completed",
		description: "Done, closed, fixed, resolved",
		onClick: () => {
			setEditState("closed");
			setReason("completed");
			setOptionVis(!optionVis);
		},
	};
	const notPlanned = {
		name: "not_planned",
		icon: <SkipIcon fill="#6e7781" />,
		text: "Close as not planned",
		description: "Won't fix, can't repro, duplicate, stale",
		onClick: () => {
			setEditState("closed");
			setReason("not_planned");
			setOptionVis(!optionVis);
		},
	};
	const reOpen = {
		name: "reopen",
		icon: <IssueReopenedIcon fill="#2da44e" />,
		text: "Reopen Issue",
		description: "",
		onClick: () => {
			setEditState("open");
			setReason("reopened");
			setOptionVis(!optionVis);
		},
	};

	const options =
		state === "open" ? [completed, notPlanned] : [reOpen, notPlanned];

	function handelSubmitApi() {
		if (body !== "") {
			createComment({
				owner: "athenacheng15",
				repo: localStorage.getItem("repo"),
				number: number,
				body: body,
			});
			setBodyValue("");
		}
		editIssueState({
			owner: "athenacheng15",
			repo: "issue_test",
			number,
			state: editState,
			state_reason: reason,
		});
		setEditState(editState === "open" ? "closed" : "open");
		setReason(editState === "open" ? "completed" : "reopened");
	}

	console.log(reason);
	console.log(editState);
	console.log(body);

	return (
		<div className=" flex justify-center items-center bg-[#f6f8fa] text-[#24292f] ">
			<button
				className="flex justify-center items-center w-[auto] h-8 px-4 border border-solid rounded-l-md border-[#d1d5da] text-sm font-bold cursor-pointer hover:bg-[#f0f0f0]"
				onClick={handelSubmitApi}
			>
				<div className={`flex items-center `}>
					{reason === "not_planned" ? (
						<SkipIcon fill="#6e7781" />
					) : state === "open" ? (
						<IssueClosedIcon fill="#8250df" />
					) : (
						<IssueReopenedIcon fill="#2da44e" />
					)}
				</div>

				<p className="ml-2">
					{state === "open"
						? `Close ${body ? "with comment" : "issue"}`
						: reason === "not_planned"
						? "Close as not planned"
						: "Reopen"}
				</p>
			</button>
			<button
				className="relative flex justify-center items-center w-[auto] h-8 px-3 border border-solid border-l-0 rounded-r-md border-[#d1d5da] text-sm font-bold cursor-pointer hover:bg-[#f0f0f0]"
				onClick={() => setOptionVis(!optionVis)}
			>
				<TriangleDownIcon />
				<div
					className={`${
						optionVis ? "block" : "hidden"
					} absolute w-[300px] h-[auto] right-0 top-9 bg-[#fff] text-[#24292f] border border-solid rounded-md border-[#d1d5da]`}
				>
					{options.map((item) => (
						<button
							key={item.text}
							className="flex p-2 border-0 border-solid w-[100%] border-[#d1d5da] cursor-pointer first:border-b"
							onClick={item.onClick}
						>
							<div
								className={`${reason === item.name ? "block" : "invisible"}`}
							>
								<CheckIcon />
							</div>
							<div className="pl-1">
								<div className="flex items-center">
									{item.icon}
									<p className="ml-1">{item.text}</p>
								</div>
								<p
									className={`text-xs font-normal text-[#57606a] ${
										state !== "open" && "hidden"
									}`}
								>
									{item.description}
								</p>
							</div>
						</button>
					))}
				</div>
			</button>
		</div>
	);
}
