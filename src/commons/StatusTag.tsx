import {
	IssueOpenedIcon,
	IssueClosedIcon,
	SkipIcon,
} from "@primer/octicons-react";

interface StatusTagProp {
	status: string;
	statusReason?: string;
}

export default function StatusTag({ status, statusReason }: StatusTagProp) {
	return (
		<>
			<div
				className={`flex items-center w-[auto] px-4 h-8 rounded-full text-sm text-white font-medium ${
					status === "Open" ? "bg-[#2da44e]" : "bg-[#8250df]"
				}`}
			>
				{status === "Open" ? (
					<IssueOpenedIcon />
				) : statusReason === "completed" ? (
					<IssueClosedIcon />
				) : (
					<SkipIcon />
				)}

				<p className="pl-1">{status}</p>
			</div>
		</>
	);
}
