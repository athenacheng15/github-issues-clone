import { XIcon, CheckIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { useGetLabelsQuery } from "../../services/labelsApi";
import { handleLabelQuery, cleanLabelQuery } from "../../app/issuesSlice";

interface LabelProps {
	setPopLabelVis: Dispatch<SetStateAction<boolean>>;
}

export default function PopLabel({ setPopLabelVis }: LabelProps) {
	const loginUser = useSelector((state: RootState) => state.login);
	const { data } = useGetLabelsQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
	});

	const labels = useSelector((state: RootState) => state.queries.labels);
	const dispatch = useDispatch();

	const [inputText, setInputText] = useState("");

	return (
		<>
			<div
				className={`z-[1] fixed px-4 w-[100%] h-[100%] right-0 top-0 text-[#24292f] bg-black/50  M:absolute M:h-[auto] M:w-[auto] M:px-0 M:bg-transparent M:top-7 M:left-4 M:right-[auto] XL:right-4 XL:left-[auto]`}
			>
				<div className="flex  w-[100%] h-[100%] items-center M:text-[12px] ">
					<div className="w-[100%] h-[auto] max-h-[520px] overflow-y-scroll rounded-xl border border-[#d1d5da] border-solid bg-[#ffffff] M:w-[300px] M:rounded-md">
						<header className="flex p-4 w-[100%] justify-between M:py-2">
							<p>
								<strong>Filter by Label</strong>
							</p>
							<button
								className="cursor-pointer"
								onClick={() => setPopLabelVis(false)}
							>
								<XIcon />
							</button>
						</header>
						<div className="p-4 border-0 border-t border-[#d1d5da] border-solid M:p-2">
							<input
								className="w-[100%] pl-3 h-8 border border-[#d1d5da] border-solid rounded-md focus:border-[#0969da] focus:border-2"
								placeholder="Filter labels"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							></input>
						</div>
						<button
							className="flex  w-[100%] px-6 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] M:py-2"
							onClick={() => {
								dispatch(cleanLabelQuery());
								setPopLabelVis(false);
							}}
						>
							<p>
								<strong>Unlabeled</strong>
							</p>
						</button>
						<div className="flex flex-wrap">
							{data?.map((item) => (
								<button
									key={item.id}
									id={item.name}
									className={`${
										item.name.includes(inputText) ? "flex" : "hidden"
									}  w-[100%] px-6 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] M:py-2`}
									onClick={() => {
										dispatch(handleLabelQuery(item.name));
										setInputText("");
										setPopLabelVis(false);
									}}
								>
									<div
										className={`${
											labels?.includes(item.name) ? "visible" : "invisible"
										}`}
									>
										<CheckIcon />
									</div>
									<div
										style={{ backgroundColor: `#${item.color}` }}
										className="w-4 h-4 ml-1 rounded-lg"
									></div>
									<div className="pl-2">
										<p>
											<strong>{item.name}</strong>
										</p>
										<p className="text-[#57606a]">{item.description}</p>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
