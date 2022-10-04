import CreateArea from "./CreateArea";
import RightFuncBar from "./RightFuncBar";

export default function NewIssue() {
	return (
		<>
			<div className="w-[100%] m-[auto] mt-2 p-4 max-w-[1280px] L:flex L:px-6 XL:px-8">
				<div className="flex w-[100%]">
					<img
						className="hidden L:block w-10 h-10 rounded-[100%] mr-2 "
						src="https://avatars.githubusercontent.com/u/64196504?v=4
"
					></img>
					<div className="w-[100%]">
						<CreateArea />
					</div>
				</div>
				<div className="mt-8 L:mt-0 L:ml-4 XL:ml-6">
					<RightFuncBar />
				</div>
			</div>
		</>
	);
}
