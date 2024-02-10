import { Dispatch, SetStateAction } from "react";
import Tag from "../tags/Tag";
import MarkDownArea from "./MarkDownArea";
import DropdownList from "../dropdown/DropDown";
import ReactionBar from "../ReactionsBar";
import { KebabHorizontalIcon, SmileyIcon } from "@primer/octicons-react";
import { ReactionType } from "../../../models/ReactionType";

interface IssueViewProps {
	self?: boolean;
	login?: string;
	owner?: string;
	time?: string;
	first?: boolean;
	type?: string;
	vis: boolean;
	setVis: Dispatch<SetStateAction<boolean>>;
	defaultBody?: string;
	reactions?: ReactionType;
	issueDropDownList: DropDownProps[];
	commentDropDownList: DropDownProps[];
}

interface DropDownProps {
	name: string;
	action?: () => void;
	first?: boolean;
	last?: boolean;
}

export default function IssueView({
	self,
	login,
	owner,
	time,
	first,
	type,
	vis,
	setVis,
	defaultBody,
	reactions,
	issueDropDownList,
	commentDropDownList,
}: IssueViewProps) {
	return (
		<div
			className={`w-[100%] h-[auto] rounded-md border border-solid text-sm text-[#57606a] ${
				self ? "border-[#54aeff66]" : "border-[#d1d5da]"
			}`}
		>
			<div
				className={`flex items-center justify-between px-4 w-[100%] h-[36px] border-0 border-b border-solid ${
					self
						? "bg-[#ddf4ff] border-[#54aeff66]"
						: " bg-[#f6f8fa] border-[#d1d5da]"
				}`}
			>
				<p className="flex flex-wrap">
					<strong className="text-[#24292f] mr-1">{login}</strong>
					commented <p className="ml-1">{time}</p>
				</p>
				<div className="flex items-center space-x-2">
					<div className="hidden M:flex">
						<Tag
							text="owner"
							self={self}
							display={first || login === owner}
						></Tag>
						<Tag text="Author" self={self} display={login === owner}></Tag>
					</div>
					<button className="hidden L:flex justify-center items-center cursor-pointer">
						<SmileyIcon />
					</button>
					<button
						className="relative flex justify-center items-center cursor-pointer"
						onClick={() => setVis(!vis)}
					>
						<KebabHorizontalIcon />
						<div>
							<DropdownList
								right="-10px"
								top="25px"
								width="190px"
								listitems={
									type === "issue" ? issueDropDownList : commentDropDownList
								}
								dropDownVis={vis}
								setDropDownVis={setVis}
							/>
						</div>
					</button>
				</div>
			</div>
			<div className="p-4 text-[#24292f]">
				<MarkDownArea
					text={defaultBody ? defaultBody : "No sescription provided"}
				/>
			</div>
			<div>
				<ReactionBar reactions={reactions?.reactions} />
			</div>
		</div>
	);
}
