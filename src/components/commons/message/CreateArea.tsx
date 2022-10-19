import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import TextareaMarkdown, {
	TextareaMarkdownRef,
} from "textarea-markdown-editor";
import NormalBtn from "../buttons/NormalBtn";
import {
	TypographyIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	QuoteIcon,
	CodeIcon,
	LinkIcon,
	MentionIcon,
	ImageIcon,
	CrossReferenceIcon,
	ReplyIcon,
	HeadingIcon,
	BoldIcon,
	ItalicIcon,
	ListUnorderedIcon,
	ListOrderedIcon,
	TasklistIcon,
	MarkdownIcon,
	InfoIcon,
} from "@primer/octicons-react";

import { commands } from "../../../utils/markdownStyle";
import MarkDownArea from "./MarkDownArea";
import CloseBtn from "../../../pages/issue/CloseBtn";

interface CreateAreaProp {
	type: string;
	handleTitle: (value: string) => AnyAction;
	handleBody: (value: string) => AnyAction;
	submitFunc: () => void;
	title?: boolean;
	defaltTitle?: string;
	defaultBody: string;
	hight: string;
	commentMode?: boolean;
	secondBtn?: JSX.Element;
	submitText: string;
	state?: string;
	stateReason?: string;
	img: string;
}

export default function CreateArea({
	type,
	handleTitle,
	handleBody,
	submitFunc,
	title,
	defaltTitle,
	defaultBody,
	hight,
	commentMode,
	submitText,
	state,
	img,
}: CreateAreaProp) {
	const [inputStatus, setInputStatus] = useState("Write");
	const [bottomVis, setBottomVis] = useState(false);
	const inputBtnList = [
		{ name: "Write", action: "" },
		{ name: "Preview", action: "" },
	];

	const [titleValue, setTitleValue] = useState<string>(defaltTitle || "");
	const [bodyValue, setBodyValue] = useState<string>(defaultBody);
	const dispatch = useDispatch();
	const ref = useRef<TextareaMarkdownRef>(null);

	return (
		<div className="flex w-[100%]">
			<div className="w-[auto]">
				<img
					className="hidden L:block w-10 h-10 rounded-[100%] mr-4 "
					src={img}
				></img>
			</div>
			<div className="w-[100%]">
				<div className=" w-[100%] h-[auto] rounded-md L:border L:border-[#d1d5da] L:border-solid pb-2">
					<section className={`L:mx-2 ${title ? "block" : "hidden"}`}>
						<input
							autoFocus
							className="w-[100%] h-8 mt-2 mb-1 pl-4 rounded-[6px] border border-[#d1d5da] border-solid bg-[#f6f8fa] placeholder:text-[#57606a] focus:border-[#0969da] focus:border-2 focus:bg-[#ffffff] "
							placeholder="Title"
							value={titleValue}
							onChange={(e) => {
								setTitleValue(e.target.value);
							}}
							onBlur={() => dispatch(handleTitle(titleValue))}
						></input>
					</section>
					<div className="XL:flex">
						<section className="flex mt-3 text-center text-sm w-[100%] h-10 L:border-0 L:border-b L:border-[#d1d5da] L:border-solid">
							{inputBtnList.map((item) => (
								<button
									key={item.name}
									className={` w-[50%] px-4 border border-[#d1d5da] border-solid  last:border-l-0 cursor-pointer L:w-[auto] L:ml-2 L:bg-[#ffffff] L:last:border-l L:border-b-0 L:rounded-t-md ${
										item.name === inputStatus
											? "bg-[#ffffff] border-b-0 L:border L:border-[#d1d5da] L:border-solid L:shadow-[0_1px_0px_rgba(255,255,255,1)]"
											: " bg-[#f6f8fa] L:border-0 L:last:border-l-0 text-[#57606a] hover:text-black"
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
								inputStatus === "Preview" ? "hidden" : "block"
							}`}
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
									{[...iconGorup2, ...iconGorup4].map((item, index) => (
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
									))}
								</div>
							</div>
							<div
								className={`flex px-2 ${
									bottomVis ? "block" : "hidden"
								} L:hidden`}
							>
								{[...iconGorup1, ...iconGorup3].map((item, index) => (
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
								))}
							</div>
							<div className="hidden L:flex L:ml-3">
								{[
									...iconGorup1,
									...iconGorup2,
									...iconGorup3,
									...iconGorup4,
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
							<div className="L:mx-2 XL:mt-1">
								<TextareaMarkdown
									className={`${
										hight === "s" ? "h-[100px]" : "h-[200px]"
									} w-[100%] px-2 py-3 mt-2 text-sm rounded-[6px] border border-[#d1d5da] border-solid bg-[#f6f8fa] placeholder:text-[#57606a] focus:border-[#0969da] focus:border-2 focus:bg-[#ffffff] L:mt-1`}
									placeholder="Leave a comment"
									value={bodyValue}
									onChange={(e) => {
										setBodyValue(e.target.value);
									}}
									onBlur={() => dispatch(handleBody(bodyValue))}
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
							className={`flex ${
								commentMode ? "justify-end" : "justify-between px-2"
							} items-center  text-[#57606a]`}
						>
							<a
								className={`hidden ${
									commentMode ? "L:hidden" : "L:block"
								} text-xs`}
							>
								<MarkdownIcon />
								<span className="ml-2">Styling with Markdown is supported</span>
							</a>
							<div className="flex">
								<div className={`${commentMode ? "flex" : "hidden"} mr-1`}>
									<CloseBtn
										state={state}
										body={bodyValue}
										setBodyValue={setBodyValue}
									/>
								</div>
								<div
									className={`${commentMode ? "flex L:mr-2" : "hidden"} L:flex`}
								>
									<button
										onClick={() => {
											setInputStatus("Write");
											setBodyValue("");
											console.log("issue clicked");
										}}
									>
										<NormalBtn
											text={submitText}
											colorType="green"
											width={commentMode ? "auto" : "150px"}
											disabled={
												type === "comment"
													? bodyValue === ""
													: titleValue === ""
											}
											onClick={submitFunc}
										/>
									</button>
								</div>
							</div>
						</div>
					</section>
				</div>
				<section className="text-xs text-[#57606a] mt-2">
					<span className="mr-1">
						<InfoIcon />
					</span>
					Remember, contributions to this repository should follow our{" "}
					<a
						className="text-[#0969da] cursor-pointer hover:underline"
						href="https://docs.github.com/en/site-policy/github-terms/github-community-guidelines"
					>
						GitHub Community Guidelines.
					</a>
				</section>
			</div>
		</div>
	);
}

const iconGorup1 = [
	{
		icon: <HeadingIcon />,
		action: "h3",
		description: "Add heading text",
	},
	{
		icon: <BoldIcon />,
		action: "bold",
		description: "Add bold text, <Cmd+b>",
	},
	{
		icon: <ItalicIcon />,
		action: "italic",
		description: "Add italic text, <Cmd+i>",
	},
];
const iconGorup2 = [
	{
		icon: <QuoteIcon />,
		action: "block-quotes",
		description: "Add a quote, <Cmd+Shift+.>",
	},
	{
		icon: <CodeIcon />,
		action: "code",
		description: "Add code, <Cmd+e>",
	},
	{
		icon: <LinkIcon />,
		action: "link",
		description: "Add a link, <Cmd+k>",
	},
];
const iconGorup3 = [
	{
		icon: <ListUnorderedIcon />,
		action: "unordered-list",
		description: "Add a bulleted list, <Cmd+Shift+8>",
	},
	{
		icon: <ListOrderedIcon />,
		action: "ordered-list",
		description: "Add a numbered list, <Cmd+Shift+7>",
	},
	{
		icon: <TasklistIcon />,
		action: "",
		description: "Add a task list, <Cmd+Shift+l>",
	},
];
const iconGorup4 = [
	{
		icon: <MentionIcon />,
		action: "",
		description: "Directly mention a user or team",
	},
	{
		icon: <ImageIcon />,
		action: "image",
		description: "Attach an image or video",
	},
	{
		icon: <CrossReferenceIcon />,
		action: "",
		description: "Reference an issue, pull request, or discussion",
	},
	{
		icon: <ReplyIcon />,
		action: "",
		description: "Add saved reply",
	},
];
