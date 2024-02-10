import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { markdownStyle, commands } from "../../../utils/markdownStyle";

interface Props {
	text: string;
}

export default function MarkDownArea({ text }: Props) {
	return (
		<>
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
				{text.replace(/\n\r?/g, "\n\r")}
			</ReactMarkdown>
		</>
	);
}
