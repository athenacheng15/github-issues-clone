import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ReactionType } from "../../../models/ReactionType";
import type { RootState } from "../../../app/store";
import {
	useDeleteCommentMutation,
	useEditIssueMutation,
	useEditCommentMutation,
} from "../../../services/issueApi";
import { handleIssueBody, resetAll } from "../../../app/issueSlice";
import TextareaMarkdown, {
	TextareaMarkdownRef,
} from "textarea-markdown-editor";
import { commands } from "../../../utils/markdownStyle";
import {
	markdownIconGorup1,
	markdownIconGroup2,
	markdownIconRroup3,
	markdownIconGorup4,
} from "../../../utils/markdownBtnList";
import MarkDownArea from "./MarkDownArea";
import NormalBtn from "../buttons/NormalBtn";
import {
	TypographyIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	MarkdownIcon,
} from "@primer/octicons-react";
import IssueView from "./IssueView";

interface CreateAreaProp {
	type?: string;
	id?: number;
	number?: string;
	login?: string;
	img?: string;
	time?: string;
	handleBody?: (value: string) => AnyAction;
	submitFunc?: () => void;
	defaultBody?: string;
	hight: string;
	self?: boolean;
	submitText: string;
	reactions: ReactionType;
	first?: boolean;
	owner?: string;
}

export default function CommentArea({
	id,
	number,
	type,
	login,
	img,
	time,
	defaultBody,
	hight,
	self,
	submitText,
	reactions,
	first,
	owner,
}: CreateAreaProp) {
	const dispatch = useDispatch();
	const ref = useRef<TextareaMarkdownRef>(null);
	const loginUser = useSelector((state: RootState) => state.login);
	const currentContent = useSelector((state: RootState) => state.issue);
	const [deleteComment] = useDeleteCommentMutation();
	const [editComment] = useEditCommentMutation();
	const [editIssue] = useEditIssueMutation();
	const [inputStatus, setInputStatus] = useState("Write");
	const [bottomVis, setBottomVis] = useState(false);
	const [dropDownVis, setDropDownVis] = useState(false);
	const [mode, setMode] = useState("view");
	const [bodyValue, setBodyValue] = useState<string>(defaultBody || "");

	const inputBtnList = [
		{ name: "Write", action: "" },
		{ name: "Preview", action: "" },
	];

	const issueDropDownList = [
		{ name: "Copy link" },
		{ name: "Quote reply" },
		{ name: "Reference in new issue", last: true },
		{
			name: "Edit",
			action: () => {
				setMode("edit");
			},
			first: true,
		},
		{ name: "Report content", first: true },
	];

	const commentDropDownList = [
		{ name: "Copy link" },
		{ name: "Quote reply" },
		{ name: "Reference in new issue", last: true },
		{
			name: "Edit",
			action: () => {
				setMode("edit");
			},
			first: true,
		},
		{ name: "Hide" },
		{
			name: "Delete",
			last: true,
			action: () => {
				deleteComment({
					owner: loginUser.login,
					repo: localStorage.getItem("repo"),
					id: id?.toString(),
				});
			},
		},
		{ name: "Report content", first: true },
	];
	function handleUpdateComment() {
		editComment({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			id: id?.toString(),
			body: currentContent.body,
		});
		dispatch(resetAll());
		setMode("view");
	}

	function handleUpdateIssue() {
		editIssue({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			number: number,
			content: { body: currentContent.body },
		});
		dispatch(resetAll());
		setMode("view");
	}

	return (
		<div className="flex w-[100%] ">
			<div className="w-[auto]">
				<img
					className="hidden L:block w-10 h-10 rounded-[100%] mr-4 border border-[#d1d5da] border-solid"
					src={img}
				></img>
			</div>
			<div
				className={`w-[100%] relative ${
					!first &&
					"before:h-[20px] before:w-[2px] before:absolute before:top-[-20px] before:left-[12px] before:bg-[#d1d5da]"
				} after:h-[20px] after:w-[2px] after:absolute after:bottom-[-20px] after:left-[12px] after:bg-[#d1d5da]`}
			>
				{mode === "view" ? (
					<IssueView
						self={self}
						login={login}
						owner={owner}
						time={time}
						first={first}
						type={type}
						vis={dropDownVis}
						setVis={setDropDownVis}
						defaultBody={defaultBody}
						reactions={reactions}
						issueDropDownList={issueDropDownList}
						commentDropDownList={commentDropDownList}
					/>
				) : (
					<div className="w-[100%]">
						<div
							className={`w-[100%] h-[auto] rounded-md border  border-solid pb-2 ${
								self ? "border-[#54aeff66]" : "border-[#d1d5da]"
							}`}
						>
							<div className="XL:flex">
								<section
									className={`flex pt-3 text-center text-sm w-[100%] border-0 border-b border-solid ${
										self
											? "border-[#54aeff66] bg-[#ddf4ff]"
											: "border-[#d1d5da] bg-[#f6f8fa]"
									}`}
								>
									{inputBtnList.map((item) => (
										<button
											key={item.name}
											className={` w-[auto] h-10 px-4 cursor-pointer ml-2 border-b-0 rounded-t-md ${
												item.name === inputStatus
													? "bg-[#ffffff] border-b-0 border border-[#d1d5da] border-solid shadow-[0_1px_0px_rgba(255,255,255,1)]"
													: " border-0  text-[#57606a] hover:text-black"
											} `}
											onClick={() => {
												setInputStatus(item.name);
											}}
										>
											{item.name}
										</button>
									))}
								</section>
								<section
									className={`py-2 XL:pr-2 XL:border-0 XL:border-b XL:border-[#d1d5da] XL:border-solid ${
										self ? "XL:bg-[#ddf4ff]" : "XL:bg-[#f6f8fa]"
									}  ${inputStatus === "Preview" ? "hidden" : "block"}`}
								>
									<div className="flex px-2 justify-between text-[#57606a] L:hidden">
										<button
											className="flex p-2 ml-1 cursor-pointer  hover:text-[#0969da]"
											onClick={() => setBottomVis(!bottomVis)}
										>
											<TypographyIcon />
											{bottomVis ? <ChevronDownIcon /> : <ChevronUpIcon />}
										</button>
										<div className="flex">
											{[...markdownIconGroup2, ...markdownIconGorup4].map(
												(item, index) => (
													<button
														key={index}
														className="group relative flex w-8 h-8 p-2 ml-1 cursor-pointer  hover:text-[#0969da]"
														onClick={() => ref.current?.trigger(item.action)}
														disabled={item.action === ""}
													>
														{item.icon}
														<div className="absolute hidden right-0 bottom-[-40px] whitespace-nowrap items-center nowrap px-3 w-[auto] h-[30px] bg-[#24292f] text-white text-xs rounded-md group-hover:flex">
															{item.description}
														</div>
													</button>
												)
											)}
										</div>
									</div>
									<div
										className={`flex px-2 ${
											bottomVis ? "block" : "hidden"
										} L:hidden`}
									>
										{[...markdownIconGorup1, ...markdownIconRroup3].map(
											(item, index) => (
												<button
													key={index}
													className="group relative flex w-8 h-8 p-2 ml-1 cursor-pointer text-[#57606a] hover:text-[#0969da]"
													onClick={() => ref.current?.trigger(item.action)}
													disabled={item.action === ""}
												>
													{item.icon}
													<div className="absolute hidden left-0 bottom-[-40px] whitespace-nowrap items-center nowrap px-3 w-[auto] h-[30px] bg-[#24292f] text-white text-xs rounded-md group-hover:flex">
														{item.description}
													</div>
												</button>
											)
										)}
									</div>
									<div className="hidden L:flex L:ml-3">
										{[
											...markdownIconGorup1,
											...markdownIconGroup2,
											...markdownIconRroup3,
											...markdownIconGorup4,
										].map((item, index) => (
											<button
												key={index}
												className={`group relative flex items-center justify-center w-8 h-8 p-1 cursor-pointer text-[#57606a] hover:text-[#0969da] 
								 ${item.action === "image" && "hidden"}`}
												onClick={() => ref.current?.trigger(item.action)}
												disabled={item.action === ""}
											>
												{item.icon}
												<div
													className={`absolute hidden bottom-[-40px] whitespace-nowrap items-center nowrap px-3 w-[auto] h-[30px] bg-[#24292f] text-white text-xs rounded-md group-hover:flex ${
														item.action === "h3" || item.action === "bold"
															? "left-0"
															: "right-0"
													}`}
												>
													{item.description}
												</div>
											</button>
										))}
									</div>
								</section>
							</div>

							<section>
								{inputStatus === "Write" ? (
									<div className="mx-2 XL:mt-1">
										<TextareaMarkdown
											className={`${
												hight === "s" ? "h-[100px]" : "h-[200px]"
											} w-[100%] px-2 py-3 mt-2 text-sm rounded-[6px] border border-[#d1d5da] border-solid bg-[#f6f8fa] placeholder:text-[#57606a] focus:border-[#0969da] focus:border-2 focus:bg-[#ffffff] L:mt-1`}
											placeholder="Leave a comment"
											value={bodyValue}
											onChange={(e) => {
												setBodyValue(e.target.value);
											}}
											onBlur={() => dispatch(handleIssueBody(bodyValue))}
											ref={ref}
											commands={commands}
										></TextareaMarkdown>
									</div>
								) : (
									<div className="w-[100%]  px-2 py-4 mt-2 text-sm  L:mt-1 ">
										<div className="border-0 h-[auto] min-h-[200px] px-2 border-b-2 border-[#d1d5da] border-solid pb-10">
											{bodyValue === "" ? (
												"Nothing to preview"
											) : (
												<div className=" text-[#24292f] text-sm">
													<MarkDownArea text={bodyValue} />
												</div>
											)}
										</div>
									</div>
								)}
								<div
									className={`flex justify-end px-2
							 items-center  text-[#57606a]`}
								>
									<a className={`hidden L:hidden text-xs`}>
										<MarkdownIcon />
										<span className="ml-2">
											Styling with Markdown is supported
										</span>
									</a>
									<div className="flex">
										<div className={`flex mr-1`}>
											{
												<NormalBtn
													text="Cancle"
													colorType="gray"
													width="auto"
													onClick={() => {
														setMode("view");
														setBodyValue(defaultBody || "");
														dispatch(resetAll());
													}}
												/>
											}
										</div>
										<div className={`flex `}>
											<NormalBtn
												text={submitText}
												colorType="green"
												width={"auto"}
												onClick={
													type === "issue"
														? handleUpdateIssue
														: handleUpdateComment
												}
											/>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
