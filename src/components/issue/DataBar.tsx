import Label from "../labels/Label";
export default function DataBar() {
	return (
		<>
			<div className="flex items-center w-[100%] text-xs mb-3 text-[#57606a] font-bold">
				<p className="w-[25%] M:w-[20%]">Assignee</p>
				<div className="flex space-x-1">
					<img
						className="w-[20px] h-[20px] rounded-full"
						src="https://avatars.githubusercontent.com/u/64196504?v=4"
					></img>
					<img
						className="w-[20px] h-[20px] rounded-full"
						src="https://avatars.githubusercontent.com/u/64196504?v=4"
					></img>
				</div>
			</div>
			<div className="flex items-center w-[100%] text-xs mb-3 text-[#57606a] font-bold">
				<p className="w-[25%] M:w-[20%]">Labels</p>
				<div className="flex">
					<Label bgColor="234345" labelText="label" />
					<Label bgColor="234345" labelText="label" />
					<Label bgColor="234345" labelText="label" />
				</div>
			</div>
		</>
	);
}
