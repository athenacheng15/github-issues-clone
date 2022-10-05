import { Dispatch, SetStateAction } from "react";
import { GearIcon } from "@primer/octicons-react";
import User from "../../commons/User";

interface BarToolProp {
	name: string;
	popVis?: boolean;
	setPopVis?: Dispatch<SetStateAction<boolean>>;
	setting: boolean;
	defaultText: string | JSX.Element;
	popOut?: JSX.Element;
	button?: string;
	onClick?: () => void;
	link?: string;
	href?: string;
	content?: JSX.Element[];
}

export default function BarTool({
	name,
	popVis,
	setPopVis,
	setting,
	defaultText,
	popOut,
	button,
	onClick,
	link,
	href,
	content,
}: BarToolProp) {
	return (
		<>
			<div className="relative w-[100%] h-[auto] min-h-[80px] py-4 border-0 border-b border-[#d1d5da] border-solid ">
				<button
					className="flex w-[100%] justify-between items-center cursor-pointer group text-[#57606a]"
					onClick={() => {
						setPopVis && setPopVis(!popVis);
					}}
				>
					<p
						className={`text-xs font-medium ${
							setting && "group-hover:text-[#0969da]"
						}`}
					>
						{name}
					</p>
					<div
						className={`group-hover:text-[#0969da] ${
							setting ? "block" : "hidden"
						}`}
					>
						<GearIcon />
					</div>
				</button>
				{!content && (
					<div className=" flex text-xs mt-1">
						{defaultText}
						{button && (
							<button className="cursor-pointer text-[#57606a] hover:text-[#0969da]">
								{button}
							</button>
						)}
						{link && (
							<a
								className="mt-2 text-xs text-[#0969da] cursor-pointer hover:underline"
								href={href}
							>
								{link}
							</a>
						)}
					</div>
				)}
				{content && <div className="flex flex-wrap">{content}</div>}

				{popOut && (
					<div className={`${popVis ? "block" : "hidden"}`}>{popOut}</div>
				)}
			</div>
		</>
	);
}
