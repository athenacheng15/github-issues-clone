import { XIcon, CheckIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetAssigneeQuery } from "../../services/issuesApi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { handleAssignee } from "../../app/issuesSlice";

interface AssigneeProps {
	setPopAssigneeVis: Dispatch<SetStateAction<boolean>>;
}

export default function PopAssignee({ setPopAssigneeVis }: AssigneeProps) {
	const loginUser = useSelector((state: RootState) => state.login);
	const { data } = useGetAssigneeQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	const assignee = useSelector((state: RootState) => state.queries.assignee);
	const dispatch = useDispatch();

	const [inputText, setInputText] = useState("");
	return (
		<>
			<div
				className={`z-[1] fixed px-4 w-[100%] h-[100%] right-0 top-0 text-[#24292f] bg-black/50  M:absolute M:h-[auto] M:w-[auto] M:px-0 M:bg-transparent M:top-7 M:left-4 M:right-[auto] XL:right-4 XL:left-[auto]`}
			>
				<div className="flex  w-[100%] h-[100%] items-center M:text-[12px] ">
					<div className="w-[100%] h-[auto] max-h-[520px] overflow-y-scroll rounded-xl border border-[#d1d5da] border-solid bg-[#ffffff] M:w-[300px] M:rounded-md ">
						<header className="flex p-4 w-[100%] justify-between M:py-2">
							<p>
								<strong>Filter by who’s assigned</strong>
							</p>
							<button
								className="cursor-pointer"
								onClick={() => setPopAssigneeVis(false)}
							>
								<XIcon />
							</button>
						</header>
						<div className="p-4 border-0 border-t border-[#d1d5da] border-solid  M:p-2">
							<input
								className="w-[100%] pl-3 h-8 border border-[#d1d5da] border-solid rounded-md focus:border-[#0969da] focus:border-2"
								placeholder="Filter users"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							></input>
						</div>
						<button
							className="w-[100%] px-6 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] M:py-2"
							onClick={() => {
								dispatch(handleAssignee(""));
								setPopAssigneeVis(false);
							}}
						>
							<p>
								<strong>Assigned to nobody</strong>
							</p>
						</button>
						<div className="flex flex-wrap">
							{data?.map((item) => (
								<button
									key={item.id}
									className={`${
										item.login
											.toLocaleLowerCase()
											.includes(inputText.toLocaleLowerCase())
											? "flex"
											: "hidden"
									} flex items-center w-[100%] px-6 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] M:py-2`}
									onClick={() => {
										item.login === assignee
											? dispatch(handleAssignee(""))
											: dispatch(handleAssignee(item.login));
										setPopAssigneeVis(false);
										setInputText("");
									}}
								>
									<div
										className={`${
											item.login === assignee ? "visible" : "invisible"
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
			</div>
		</>
	);
}
