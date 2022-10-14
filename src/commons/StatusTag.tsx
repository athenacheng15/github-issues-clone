import {
	IssueOpenedIcon,
	IssueClosedIcon,
	SkipIcon,
} from "@primer/octicons-react";

interface StatusTagProp {
	status?: string;
	statusReason?: string;
}

export default function StatusTag({ status, statusReason }: StatusTagProp) {
	const statueText = `${status?.charAt(0).toUpperCase()}${status?.slice(1)}`;
	return (
		<>
			<div
				className={`flex items-center w-[auto] px-4 h-8 rounded-full text-sm text-white font-medium ${
					status === "open"
						? "bg-[#2da44e]"
						: statusReason === "completed"
						? "bg-[#8250df]"
						: "bg-[#6e7781]"
				}`}
			>
				{status === "open" ? (
					<IssueOpenedIcon />
				) : statusReason === "completed" ? (
					<IssueClosedIcon />
				) : (
					<SkipIcon />
				)}

				<p className="pl-1">{statueText}</p>
			</div>
		</>
	);
}
