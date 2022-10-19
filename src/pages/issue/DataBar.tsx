import Label from "../../components/commons/tags/Label";
import { RepoLabels } from "../../models/LabelsType";
import { UserDefaultData } from "../../models/IssuesType";

interface RightFuncBarProps {
	labelsData?: RepoLabels[];
	assigneesData?: UserDefaultData[];
}
export default function DataBar({
	labelsData,
	assigneesData,
}: RightFuncBarProps) {
	return (
		<>
			<div className="flex items-center w-[100%] text-xs mb-3 text-[#57606a] font-bold">
				<p className="w-[25%] M:w-[20%]">Assignee</p>
				<div className="flex space-x-1">
					{assigneesData?.map((item, index) => (
						<img
							key={index}
							className="w-[20px] h-[20px] rounded-full"
							src={item.avatar_url}
						></img>
					))}
				</div>
			</div>
			<div className="flex items-center w-[100%] text-xs mb-3 text-[#57606a] font-bold">
				<p className="w-[25%] M:w-[20%]">Labels</p>
				<div className="flex flex-wrap">
					{labelsData?.map((item, index) => (
						<div key={index} className="mt-1">
							<Label bgColor={item.color} labelText={item.name} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
