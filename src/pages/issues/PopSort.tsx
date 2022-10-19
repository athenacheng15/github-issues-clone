import { XIcon, CheckIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";

import { handleSort } from "../../app/issuesSlice";

const itemList = [
	{ name: "Newest", query: "created" },
	{ name: "Oldest", query: "created-asc" },
	{ name: "Most Commented", query: "comments" },
	{ name: "Least Commented", query: "comments-asc" },
	{ name: "Recently updateed", query: "updated" },
	{ name: "Least recently updateed", query: "updated-asc" },
];

interface SortProps {
	setPopSortVis: Dispatch<SetStateAction<boolean>>;
}

export default function PopSort({ setPopSortVis }: SortProps) {
	const sort = useSelector((state: RootState) => state.queries.sort);
	const dispatch = useDispatch();

	return (
		<>
			<div
				className={`z-[1] fixed px-4 w-[100%] h-[100%] left-0 top-0 text-[#24292f] bg-black/50 M:absolute M:h-[auto] M:w-[auto] M:px-0 M:bg-transparent M:top-7 XL:right-4 XL:left-[auto]`}
			>
				<div className="flex w-[100%] h-[100%] items-center M:text-[12px] ">
					<div className="w-[100%] h-[auto] rounded-xl border border-[#d1d5da] border-solid bg-[#ffffff] M:w-[300px] M:rounded-md ">
						<header className="flex p-4 w-[100%] justify-between M:py-2">
							<p>
								<strong>Sort by</strong>
							</p>
							<button
								className="cursor-pointer"
								onClick={() => setPopSortVis(false)}
							>
								<XIcon />
							</button>
						</header>
						<div className="flex flex-wrap ">
							{itemList.map((item) => (
								<button
									key={item.name}
									id={item.name}
									className="flex items-center w-[100%] px-6 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] M:py-2"
									onClick={() => {
										item.query === sort
											? dispatch(handleSort(""))
											: dispatch(handleSort(item.query));
										setPopSortVis(false);
									}}
								>
									<div
										className={`${
											item.query === sort ? "visible" : "invisible"
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
