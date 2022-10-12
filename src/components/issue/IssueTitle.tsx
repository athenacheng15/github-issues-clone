import { useState, useEffect, Dispatch, SetStateAction } from "react";
import NormalBtn from "../../commons/NormalBtn";

export default function IssueTitle() {
	const [mode, setMode] = useState("view");
	return (
		<>
			{mode === "view" ? (
				<div className="justify-between L:flex">
					<div className="flex justify-between items-center w-[100%] mb-4 order-2 L:w-[auto] L:mb-0 ">
						<div className=" space-x-2 ">
							<NormalBtn
								text="Edit"
								colorType="gray"
								width="auto"
								size="s"
								onClick={() => setMode("edit")}
							/>
							<NormalBtn
								text="New issue"
								colorType="green"
								width="auto"
								size="s"
							/>
						</div>
						<a className="text-sm font-medium text-[#0969da] cursor-pointer hover:underline L:hidden ">
							Jump to bottom
						</a>
					</div>
					<div className="flex items-center space-x-2 order-1 text-[26px] L:text-[32px]">
						<p className="">失礼だな－純愛だよ~~</p>
						<p className="text-[#57606a]">#18</p>
					</div>
				</div>
			) : (
				<div className="mb-2 items-center L:flex ">
					<input
						className="w-[100%] h-8 mb-2 border border-[#d1d5da] border-solid rounded-md bg-[#f6f8fa] focus:border-[#0969da] focus:border-2 focus:bg-[#ffffff] L:mb-0"
						autoFocus
					/>
					<div className="flex items-center L:ml-4">
						<NormalBtn text="Save" colorType="gray" width="auto" />
						<button
							className=" px-4 text-sm text-[#0969da] cursor-pointer L:pr-0"
							onClick={() => setMode("view")}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
}
