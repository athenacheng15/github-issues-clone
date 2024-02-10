import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEditIssueMutation } from "../../services/issueApi";
import { useNavigate } from "react-router-dom";
import NormalBtn from "../../components/commons/buttons/NormalBtn";

interface IssueTitleProp {
	defaultTitle?: string;
	number: string;
}

export default function IssueTitle({ defaultTitle, number }: IssueTitleProp) {
	const loginUser = useSelector((state: RootState) => state.login);
	const navigate = useNavigate();
	const [mode, setMode] = useState("view");
	const [inputValue, setInputValue] = useState(defaultTitle);
	const [editIssue] = useEditIssueMutation();

	function handleSubmit() {
		editIssue({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			number: number,
			content: { title: inputValue },
		});
		setMode("view");
	}

	return (
		<>
			{mode === "view" ? (
				<div className="justify-between L:flex">
					<div className="flex justify-between items-center w-[100%] mb-4 order-2 L:w-[auto] L:mb-0 ">
						<div className=" space-x-2 ">
							<NormalBtn
								text="Edit"
								colorType="gray"
								width="auto"
								size="s"
								onClick={() => {
									setMode("edit");
									setInputValue(defaultTitle);
								}}
							/>
							<NormalBtn
								text="New issue"
								colorType="green"
								width="auto"
								size="s"
								onClick={() => navigate("/issues/new")}
							/>
						</div>
						<a className="text-sm font-medium text-[#0969da] cursor-pointer hover:underline L:hidden ">
							Jump to bottom
						</a>
					</div>
					<div className="flex items-center space-x-2 order-1 text-[26px] L:text-[32px]">
						<p className="">{defaultTitle}</p>
						<p className="text-[#57606a]">#{number}</p>
					</div>
				</div>
			) : (
				<div className="mb-2 items-center L:flex ">
					<input
						className="w-[100%] h-8 mb-2 pl-2 border border-[#d1d5da] border-solid rounded-md bg-[#f6f8fa] focus:border-[#0969da] focus:border-2 focus:bg-[#ffffff] L:mb-0"
						autoFocus
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<div className="flex items-center L:ml-4">
						<NormalBtn
							text="Save"
							colorType="gray"
							width="auto"
							onClick={handleSubmit}
						/>
						<button
							className=" px-4 text-sm text-[#0969da] cursor-pointer L:pr-0"
							onClick={() => {
								setMode("view");
								setInputValue(defaultTitle);
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
}
