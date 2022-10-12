import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useCreateIssueMutation } from "../../services/newIssueApi";
import { handleTitle, handleBody, resetAll } from "../../app/newIssueSlice";
import CreateArea from "../new_issue/CreateArea";
import RightFuncBar from "./RightFuncBar";
import NormalBtn from "../../commons/NormalBtn";
import IssueTitle from "./IssueTitle";
import DataBar from "./DataBar";
import StatusTag from "../../commons/StatusTag";
import CommentArea from "./CommentArea";

export default function Issue() {
	const currentContent = useSelector((state: RootState) => state.contents);
	const loginUser = useSelector((state: RootState) => state.login);
	const [createIssue] = useCreateIssueMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleCreateIssue() {
		dispatch(handleBody(currentContent.body.replace(/\n\r?/g, "\n\r")));
		createIssue({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			content: currentContent,
		});
		dispatch(resetAll());
		navigate("/issues");
	}

	return (
		<div className="w-[100%] max-w-[1280px] my-4 L:mx-[auto] px-4 L:px-6 XL:px-8">
			<div className=" py-2 ">
				<IssueTitle />
			</div>
			<div className="flex items-center mb-2 pb-4 w-[auto] text-sm text-[#57606a] border-0 border-b border-[#d1d5da] border-solid">
				<StatusTag status="Open" />
				<p className="pl-2">
					<strong>athenacheng15</strong> opened this issue 7 days ago · 8
					comments
				</p>
			</div>
			<div className="py-2 border-0 border-b border-[#d1d5da] border-solid L:hidden">
				<DataBar />
			</div>

			<div className="w-[100%] mt-2 py-4 L:flex ">
				<div className="w-[100%]">
					<div className="flex w-[100%] mb-6 ">
						<CommentArea
							handleBody={handleBody}
							submitText="Update comment"
							defaultBody=""
							submitFunc={handleCreateIssue}
							hight="s"
							self={true}
						/>
					</div>
					<div className="flex w-[100%] mb-6 ">
						<CommentArea
							handleBody={handleBody}
							submitText="Update comment"
							defaultBody=""
							submitFunc={handleCreateIssue}
							hight="s"
							self={true}
						/>
					</div>
					<div className="flex w-[100%] pt-6 mt-6 border-0 border-t-2 border-solid border-[#d1d5da]">
						<CreateArea
							handleTitle={handleTitle}
							handleBody={handleBody}
							submitText="Comment"
							defaultBody=""
							submitFunc={handleCreateIssue}
							hight="s"
							commentMode={true}
							secondBtn={
								<NormalBtn
									text="Submit new Issue"
									colorType="green"
									width="150px"
								/>
							}
						/>
					</div>
				</div>
				<div className="mt-8 L:mt-0 L:ml-4 XL:ml-6">
					<RightFuncBar />
				</div>
			</div>
		</div>
	);
}
