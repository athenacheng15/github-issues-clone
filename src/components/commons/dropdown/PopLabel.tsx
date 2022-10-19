import { XIcon, CheckIcon, PencilIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { handleLabels } from "../../../app/newIssueSlice";
import { RepoLabels } from "../../../models/LabelsType";

interface LabelProps {
	setPopLabelVis: Dispatch<SetStateAction<boolean>>;
	data?: RepoLabels[];
}

export default function PopLabel({ setPopLabelVis, data }: LabelProps) {
	const currentContent = useSelector((state: RootState) => state.contents);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [inputText, setInputText] = useState("");

	return (
		<>
			<div
				className={`z-[1] flex items-center fixed px-4 w-[100%] h-[100%] right-0 top-0 text-[#24292f] bg-black/50  L:absolute L:h-[auto] L:w-[auto] L:px-0 L:bg-transparent L:top-12 `}
			>
				<div className=" w-[100%] h-[80%] text-xs overflow-y-scroll rounded-xl border border-[#d1d5da] border-solid bg-[#ffffff] L:w-[300px] L:rounded-md L:h-[523px]">
					<div className="sticky top-0">
						<header className="flex p-4 w-[100%] justify-between L:py-2 bg-white">
							<p>
								<strong>Apply labels to this issue</strong>
							</p>
							<button
								className="cursor-pointer L:invisible"
								onClick={() => setPopLabelVis(false)}
							>
								<XIcon />
							</button>
						</header>
						<div className="p-4 border-0 border-y border-[#d1d5da] border-solid bg-white L:p-2">
							<input
								className="w-[100%] pl-3 h-8 text-sm border border-[#d1d5da] border-solid rounded-md focus:border-[#0969da] focus:border-2 placeholder:text-[#656E77]"
								placeholder="Filter labels"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							></input>
						</div>
					</div>
					<div className="flex flex-wrap">
						{data?.map((item) => (
							<button
								key={item.id}
								id={item.name}
								className={`${
									item.name.includes(inputText) ? "flex" : "hidden"
								}  w-[100%] px-3 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid first:border-t-0 last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] L:py-2`}
								onClick={() => {
									dispatch(handleLabels(item.name));
								}}
							>
								<div
									className={
										currentContent.labels.includes(item.name)
											? "block"
											: "invisible"
									}
								>
									<CheckIcon />
								</div>
								<div
									style={{ backgroundColor: `#${item.color}` }}
									className="w-4 h-4 ml-1 rounded-lg"
								></div>
								<div className="pl-2">
									<p>{item.name}</p>
									<p className="text-[#57606a]">{item.description}</p>
								</div>
							</button>
						))}
					</div>
					<button
						className="w-[100%] sticky bottom-0 flex px-8 py-4 font-normal text-[#57606a] border-0 border-t border-[#d1d5da] border-solid first:border-t-0 bg-white last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] L:py-2"
						onClick={() => navigate("/labels")}
					>
						<PencilIcon />
						<p className="pl-2">Edit labels</p>
					</button>
				</div>
			</div>
		</>
	);
}
