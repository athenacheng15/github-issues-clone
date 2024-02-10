/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

export const commands = [
	{
		name: "code",
		shortcut: ["command+e", "ctrl+e"],
		shortcutPreventDefault: true,
	},
	{
		name: "block-quotes",
		shortcut: ["command+shift+.", "ctrl+shift+."],
		shortcutPreventDefault: true,
	},
	{
		name: "link",
		shortcut: ["command+k", "ctrl+shift+k"],
		shortcutPreventDefault: true,
	},
	{
		name: "unordered-list",
		shortcut: ["command+shift+8", "ctrl+shift+8"],
		shortcutPreventDefault: true,
	},
	{
		name: "ordered-list",
		shortcut: ["command+shift+7", "ctrl+shift+7"],
		shortcutPreventDefault: true,
	},
];

export const markdownStyle = {
	h1: ({ node, ...props }) => (
		<h1
			className="pb-4 text-[28px] my-2 font-extrabold border-0 border-b border-solid border-[#d1d5da]"
			{...props}
		/>
	),
	h3: ({ node, ...props }) => (
		<h3 className="pb-4 text-[17.5px] font-extrabold" {...props} />
	),
	em: ({ node, ...props }) => <i className="italic" {...props} />,
	blockquote: ({ node, ...props }) => (
		<blockquote
			className=" mt-[24px] pl-4 mb-[16px] border-0 border-l-4 border-solid border-stone-200 pb-[8.4px] text-[#57606a] font-normal "
			{...props}
		/>
	),
	a: ({ node, ...props }) => (
		<a className="text-[#0969da] hover:underline" {...props} />
	),
	ul: ({ node, ...props }) => <ul className="pl-4 mt-4" {...props} />,
	ol: ({ node, ...props }) => <ol className="pl-4 mt-4" {...props} />,
	li: ({ node, ...props }) => <li className="mt-1" {...props} />,
};
