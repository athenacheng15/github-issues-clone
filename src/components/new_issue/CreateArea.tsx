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
	InfoIcon,
} from "@primer/octicons-react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { markdownStyle, commands } from "../../utils/markdownStyle";

interface CreateAreaProp {
	handleTitle: (value: string) => AnyAction;
	handleBody: (value: string) => AnyAction;
	submitFunc: () => void;
}

export default function CreateArea({
	handleTitle,
	handleBody,
	submitFunc,
}: CreateAreaProp) {
	const [inputStatus, setInputStatus] = useState("Write");
	const [bottomVis, setBottomVis] = useState(false);
	const inputBtnList = [
		{ name: "Write", action: "" },
		{ name: "Preview", action: "" },
	];

	const [titleValue, setTitleValue] = useState<string>("");
	const [bodyValue, setBodyValue] = useState<string>("");
	const dispatch = useDispatch();
	const ref = useRef<TextareaMarkdownRef>(null);
	const iconList = [
		{
			icon: <QuoteIcon />,
			order: "order-4",
			hide: false,
			action: "block-quotes",
		},
		{ icon: <CodeIcon />, order: "order-5", hide: false, action: "code" },
		{ icon: <LinkIcon />, order: "order-6", hide: false, action: "link" },
		{ icon: <MentionIcon />, order: "order-10", hide: false, action: "" },
		{ icon: <ImageIcon />, order: "order-0", hide: true, action: "image" },
		{
			icon: <CrossReferenceIcon />,
			order: "order-11",
			hide: false,
			action: "",
		},
		{ icon: <ReplyIcon />, order: "order-12", hide: false, action: "" },
		{ icon: <HeadingIcon />, order: "order-1", hide: false, action: "h3" },
		{ icon: <BoldIcon />, order: "order-2", hide: false, action: "bold" },
		{ icon: <ItalicIcon />, order: "order-3", hide: false, action: "italic" },
		{
			icon: <ListUnorderedIcon />,
			order: "order-7",
			hide: false,
			action: "unordered-list",
		},
		{
			icon: <ListOrderedIcon />,
			order: "order-8",
			hide: false,
			action: "ordered-list",
		},
		{ icon: <TasklistIcon />, order: "order-9", hide: false, action: "" },
	];

	return (
		<>
			<div className=" w-[100%] h-[auto] rounded-md L:border L:border-[#d1d5da] L:border-solid pb-2">
				<section className="L:mx-2">
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
								className={` w-[50%] px-4 border border-[#d1d5da] border-solid bg-[#f6f8fa] last:border-l-0 cursor-pointer L:w-[auto] L:ml-2 L:bg-[#ffffff] L:last:border-l L:border-b-0 L:rounded-t-md ${
									item.name === inputStatus
										? "bg-[#ffffff] border-b-0 L:border L:border-[#d1d5da] L:border-solid L:shadow-[0_1px_0px_rgba(255,255,255,1)]"
										: "L:border-0 L:last:border-l-0"
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
								{iconList.slice(0, 7).map((item) => (
									<button
										key={item.order}
										className="flex w-8 h-8 p-2 ml-1 cursor-pointer  hover:text-[#0969da]"
										onClick={() => ref.current?.trigger(item.action)}
									>
										{item.icon}
									</button>
								))}
							</div>
						</div>
						<div
							className={`flex px-2 ${bottomVis ? "block" : "hidden"} L:hidden`}
						>
							{iconList.slice(7, iconList.length).map((item) => (
								<button
									key={item.order}
									className="flex w-8 h-8 p-2 ml-1 cursor-pointer text-[#57606a] hover:text-[#0969da]"
									onClick={() => ref.current?.trigger(item.action)}
								>
									{item.icon}
								</button>
							))}
						</div>
						<div className="hidden L:flex L:ml-3">
							{iconList.map((item) => (
								<button
									key={item.order}
									className={` flex items-center justify-center w-8 h-8 p-1 cursor-pointer text-[#57606a] hover:text-[#0969da] 
								${item.order} ${item.hide && "hidden"}`}
									onClick={() => ref.current?.trigger(item.action)}
								>
									{item.icon}
								</button>
							))}
						</div>
					</section>
				</div>

				<section>
					{inputStatus === "Write" ? (
						<div className="L:mx-2 XL:mt-1">
							<TextareaMarkdown
								className="w-[100%] h-[200px] px-2 py-3 mt-2 text-sm rounded-[6px] border border-[#d1d5da] border-solid bg-[#f6f8fa] placeholder:text-[#57606a] focus:border-[#0969da] focus:border-2 L:mt-1"
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
												code({ node, inline, className, children, ...props }) {
													const match = /language-(\w+)/.exec(className || "");
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

					<div className="hidden L:flex justify-between items-center px-2 text-[#57606a]">
						<a className="text-xs ">
							<MarkdownIcon />
							<span className="ml-2">Styling with Markdown is supported</span>
						</a>
						<NormalBtn
							text="Submit new Issue"
							colorType="green"
							width="150px"
							disabled={titleValue === ""}
							onClick={submitFunc}
						/>
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
		</>
	);
}
