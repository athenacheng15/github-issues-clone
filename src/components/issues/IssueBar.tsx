import { IssueOpenedIcon, CommentIcon } from "@primer/octicons-react";
import Label from "../labels/Label";

export default function IssueBar() {
	return (
		<>
			<div className="flex px-4 py-2 border-0 border-b border-[#d1d5da] border-solid last:rounded-b-[6px] cursor-pointer hover:bg-[#f6f8fa] M:last:border-b-0">
				<div className="mr-4 pt-[2px] hidden M:inline">
					<input
						className="w-3 h-3 border border-[#57606a] border-solid rounded-[2px]"
						type="checkbox"
					></input>
				</div>
				<div className="mr-2">
					<IssueOpenedIcon fill="#1a7f37" />
				</div>

				<div className="w-[100%]">
					<p className="mb-[-2px]">
						<strong>wow wowo wow</strong>
					</p>

					<div className="mb-1">
						<Label labelText="hahaha" bgColor="d5cdb2" padding="s" />
						<Label labelText="question" bgColor="d876e3" padding="s" />
						<Label labelText="wow" bgColor="a583d3" padding="s" />
					</div>
					<p className="text-[#57606a] text-xs ">
						#1 opened 9 days ago by athenacheng15
					</p>
				</div>
				<div className="flex mt-1">
					<div className="w-5 h-5 rounded-xl bg-[#d5cdb2]"></div>
					<div className="w-5 h-5 rounded-xl bg-[#646B63] ml-[-10px] hover:ml-[3px]"></div>
				</div>
				<div className="flex text-xs font-medium text-[#57606a] ml-10 mt-1">
					<CommentIcon />
					<p className="ml-1">1</p>
				</div>
			</div>
		</>
	);
}
