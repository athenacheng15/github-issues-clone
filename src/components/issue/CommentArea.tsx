import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import TextareaMarkdown, {
	TextareaMarkdownRef,
} from "textarea-markdown-editor";
import NormalBtn from "../../commons/NormalBtn";
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
	KebabHorizontalIcon,
	SmileyIcon,
} from "@primer/octicons-react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { markdownStyle, commands } from "../../utils/markdownStyle";
import Tag from "../../commons/Tag";

interface CreateAreaProp {
	handleBody: (value: string) => AnyAction;
	submitFunc: () => void;
	defaultBody: string;
	hight: string;
	self?: boolean;
	submitText: string;
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

export default function CommentArea({
	handleBody,
	submitFunc,
	defaultBody,
	hight,
	self,
	submitText,
}: CreateAreaProp) {
	const [inputStatus, setInputStatus] = useState("Write");
	const [bottomVis, setBottomVis] = useState(false);
	const [mode, setMode] = useState("view");
	const inputBtnList = [
		{ name: "Write", action: "" },
		{ name: "Preview", action: "" },
	];

	const [bodyValue, setBodyValue] = useState<string>(defaultBody);
	const dispatch = useDispatch();
	const ref = useRef<TextareaMarkdownRef>(null);

	return (
		<div className="flex w-[100%]">
			<div className="w-[auto]">
				<img
					className="hidden L:block w-10 h-10 rounded-[100%] mr-4 "
					src="https://avatars.githubusercontent.com/u/64196504?v=4
"
				></img>
			</div>
			{mode === "view" ? (
				<div
					className={`w-[100%] h-[auto] rounded-md border border-solid text-sm text-[#57606a] ${
						self ? "border-[#54aeff66]" : "border-[#d1d5da]"
					}`}
				>
					<div
						className={`flex items-center justify-between px-4 w-[100%] h-[36px] ${
							self ? "bg-[#ddf4ff]" : " bg-[#f6f8fa]"
						}`}
					>
						<p>
							<strong className="text-[#24292f]">athenacheng15</strong>
							commented 7 days ago
						</p>
						<div className="flex items-center space-x-2">
							<Tag text="owner" owner={true}></Tag>
							<button className="flex justify-center items-center cursor-pointer">
								<SmileyIcon />
							</button>
							<button
								className="flex justify-center items-center cursor-pointer"
								onClick={() => setMode("edit")}
							>
								<KebabHorizontalIcon />
							</button>
						</div>
					</div>
					<div className="p-4 ">No sescription provided</div>
				</div>
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
												<ReactMarkdown
													components={{
														code({
															node,
															inline,
															className,
															children,
															...props
														}) {
															const match = /language-(\w+)/.exec(
																className || ""
															);
															return !inline && match ? (
																<SyntaxHighlighter
																	language={match[1]}
																	style={docco}
																	PreTag="div"
																	{...props}
																>
																	{String(children).replace(/\n$/, "")}
																</SyntaxHighlighter>
															) : (
																<code
																	className="text-xs bg-[rgba(175,184,193,0.2)] p-[2px] rounded-[4px]"
																	{...props}
																>
																	{children}
																</code>
															);
														},
														...markdownStyle,
													}}
												>
													{bodyValue.replace(/\n\r?/g, "\n\r")}
												</ReactMarkdown>
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
												onClick={() => setMode("view")}
											/>
										}
									</div>
									<div className={`flex `}>
										<NormalBtn
											text={submitText}
											colorType="green"
											width={"auto"}
											onClick={submitFunc}
										/>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			)}
		</div>
	);
}
