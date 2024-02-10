import { XIcon, CheckIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { handleFilters, resetQuery } from "../../app/issuesSlice";

const itemList = [
	{ name: "Your issues", query: "creator=" },
	{ name: "Everything assigned to you", query: "assignee=" },
	{ name: "Everything mentioning you", query: "mentioned=" },
];

interface FilterProps {
	setPopFilterVis: Dispatch<SetStateAction<boolean>>;
}

export default function PopFilter({ setPopFilterVis }: FilterProps) {
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.queries.filters);

	return (
		<>
			<div
				className={`fixed px-4 w-[100%] h-[100%] left-0 top-0  bg-black/50 M:absolute M:h-[auto] M:w-[auto] M:px-0 M:bg-transparent M:top-10`}
			>
				<div className="flex  w-[100%] h-[100%] items-center M:text-[12px] ">
					<div className="w-[100%] h-[auto]  rounded-xl border border-[#d1d5da] border-solid bg-[#ffffff] M:w-[300px] M:rounded-md ">
						<header className="flex p-4 w-[100%] justify-between M:py-2">
							<p>Filter Issues</p>
							<button
								className="cursor-pointer"
								onClick={() => setPopFilterVis(false)}
							>
								<XIcon />
							</button>
						</header>
						<div className="flex flex-wrap">
							{itemList.map((item) => (
								<button
									key={item.name}
									id={item.name}
									className="flex items-center w-[100%] px-6 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] M:py-2"
									onClick={() => {
										dispatch(resetQuery());
										item.query === filters
											? dispatch(handleFilters(""))
											: dispatch(handleFilters(item.query));
										setPopFilterVis(false);
									}}
								>
									<div
										className={`${
											item.query === filters ? "visible" : "invisible"
										}`}
									>
										<CheckIcon />
									</div>
									<p className="pl-2">{item.name}</p>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
