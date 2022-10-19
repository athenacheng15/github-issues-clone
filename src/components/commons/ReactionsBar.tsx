import { SmileyIcon } from "@primer/octicons-react";
import { ReactionType } from "../../models/ReactionType";

export default function ReactionBar({ reactions }: ReactionType) {
	const list = [
		{ name: "+1", emoji: "👍", number: reactions && reactions["+1"] },
		{ name: "-1", emoji: "👎", number: reactions && reactions["-1"] },
		{ name: "laugh", emoji: "😄", number: reactions && reactions.laugh },
		{ name: "hooray", emoji: "🎉", number: reactions && reactions.hooray },
		{ name: "confused", emoji: "😕", number: reactions && reactions.confused },
		{ name: "heart", emoji: "❤️", number: reactions && reactions.heart },
		{ name: "rocket", emoji: "🚀", number: reactions && reactions.rocket },
		{ name: "eyes", emoji: "👀", number: reactions && reactions.eyes },
	];
	return (
		<div
			className={`${
				list.every((item) => item.number === 0) ? "hidden" : "flex"
			} items-cente mb-4 ml-4 `}
		>
			<div className="flex items-center justify-center mr-1 w-[26px] h-[26px] bg-[#f6f8fa] rounded-full border border-solid border-[#d1d5da] text-[#57606a] cursor-pointer hover:bg-[#eeeeee]">
				<SmileyIcon />
			</div>
			<div className="flex ">
				{list.map((item) => (
					<button
						key={item.name}
						className={`${
							item.number === 0 ? "hidden" : "flex"
						} items-center justify-center space-x-1 mr-2 w-[42px] h-[26px] px-1 rounded-full border border-solid border-[#d1d5da] text-[#57606a] text-xs cursor-pointer hover:bg-[#f6f8fa]`}
					>
						<div>{item.emoji}</div>
						<p>{item.number}</p>
					</button>
				))}
			</div>
		</div>
	);
}
