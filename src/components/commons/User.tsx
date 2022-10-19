import { CheckIcon } from "@primer/octicons-react";

interface UserProp {
	iconVis: boolean;
	img: string;
	name: string;
}

export default function User({ iconVis, img, name }: UserProp) {
	return (
		<>
			<div className="flex flex-wrap">
				<button
					className={`flex items-center w-[100%] px-3 py-4 font-normal border-0 border-t border-[#d1d5da] border-solid
					cursor-pointer hover:bg-[#0969da] hover:text-[#fff] L:py-2`}
				>
					<div className={`${iconVis ? "block" : "invisible"}`}>
						<CheckIcon />
					</div>
					<img src={img} className="w-5 h-5 mt-1 ml-1 rounded-full"></img>
					<p className="ml-2 text-sm">
						<strong>{name}</strong>
					</p>
				</button>
			</div>
		</>
	);
}
