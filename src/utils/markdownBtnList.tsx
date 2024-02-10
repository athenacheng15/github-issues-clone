import {
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
	QuoteIcon,
} from "@primer/octicons-react";

export const markdownIconGorup1 = [
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
export const markdownIconGroup2 = [
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
export const markdownIconRroup3 = [
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
export const markdownIconGorup4 = [
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
