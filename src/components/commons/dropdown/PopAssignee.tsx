import { XIcon, CheckIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import { handleAssignees, resetAssignees } from "../../../app/newIssueSlice";
import { UserDefaultData } from "../../../models/IssuesType";

interface AssigneeProps {
	setPopAssigneeVis: Dispatch<SetStateAction<boolean>>;
	data?: UserDefaultData[];
}

export default function PopAssignee({
	setPopAssigneeVis,
	data,
}: AssigneeProps) {
	const currentContent = useSelector((state: RootState) => state.contents);
	const [inputText, setInputText] = useState("");
	const dispatch = useDispatch();

	return (
		<>
			<div
				className={`z-[1] fixed px-4 w-[100%] h-[100%] right-0 top-0 text-[#24292f] bg-black/50  L:absolute L:h-[auto] L:w-[auto] L:px-0 L:bg-transparent L:top-12`}
			>
				<div className="flex  w-[100%] h-[100%] items-center text-xs L:text-[12px] ">
					<div className="w-[100%] h-[80%] overflow-y-scroll rounded-lg border border-[#d1d5da] border-solid bg-[#ffffff] L:w-[300px] L:rounded-md ">
						<header className="flex p-4 w-[100%] justify-between L:py-2">
							<p>
								<strong>Assign up to 10 people to this issue</strong>
							</p>
							<button
								className="cursor-pointer L:invisible"
								onClick={() => setPopAssigneeVis(false)}
							>
								<XIcon />
							</button>
						</header>
						<div className="p-4 border-0 border-t border-[#d1d5da] border-solid  L:p-2">
							<input
								className="w-[100%] pl-3 h-8 border text-sm border-[#d1d5da] border-solid rounded-md focus:border-[#0969da] focus:border-2 placeholder:text-[#656E77]"
								placeholder="Type or choose a user"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							></input>
						</div>
						<button
							className="flex items-center w-[100%] px-3 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] L:py-2"
							onClick={() => dispatch(resetAssignees())}
						>
							<XIcon />
							<p className="ml-1">Clear assignees</p>
						</button>
						{/* <User iconVis={true} /> */}
						<div className="w-[100%] px-3 py-2 font-normal border-0 border-t border-[#d1d5da] border-solid bg-[#f6f8fa] L:py-2">
							<p>
								<strong>Suggestions</strong>
							</p>
						</div>
						{data?.map((item) => (
							<button
								key={item.id}
								className={`${
									item.login
										.toLocaleLowerCase()
										.includes(inputText.toLocaleLowerCase())
										? "flex"
										: "hidden"
								} flex items-center w-[100%] px-4 py-4 font-normal text-sm border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] L:py-2`}
								onClick={() => {
									dispatch(handleAssignees(item.login));
								}}
							>
								<div
									className={`${
										currentContent.assignees.includes(item.login)
											? "visible"
											: "invisible"
									}`}
								>
									<CheckIcon />
								</div>
								<img
									src={item.avatar_url}
									className="w-5 h-5 mt-1 ml-1 rounded-full"
								></img>
								<p className="ml-2">
									<strong>{item.login}</strong>
								</p>
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
