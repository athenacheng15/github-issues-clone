import { XIcon, CheckIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction } from "react";

const itemList = [
	"Newest",
	"Oldest",
	"Most Commented",
	"Least Commented",
	"Recently updateed",
	"Least recently updateed",
];

interface SortProps {
	setPopSortVis: Dispatch<SetStateAction<boolean>>;
}

export default function PopSort({ setPopSortVis }: SortProps) {
	return (
		<>
			<div
				className={`fixed px-4 w-[100%] h-[100%] left-0 top-0 text-[#24292f] bg-black/50 M:absolute M:h-[auto] M:w-[auto] M:px-0 M:bg-transparent M:top-7`}
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
									key={item}
									id={item}
									className="flex items-center w-[100%] px-6 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid last:rounded-b-[12px] cursor-pointer hover:bg-[#f6f8fa] M:py-2"
								>
									<div>
										<CheckIcon />
									</div>
									<p className="pl-2">{item}</p>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
