import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import {
	useGetIssueQuery,
	useGetCommentQuery,
	useCreateCommentMutation,
} from "../../services/issueApi";
import { handleBody, handleTitle } from "../../app/newIssueSlice";
import { handleIssueBody, resetAll } from "../../app/issueSlice";
import { setDefaultLabels, setDefaultAssignees } from "../../app/issueSlice";
import CreateArea from "../../components/commons/message/CreateArea";
import RightFuncBar from "./RightFuncBar";
import IssueTitle from "./IssueTitle";
import DataBar from "./DataBar";
import StatusTag from "../../components/commons/tags/StatusTag";
import CommentArea from "../../components/commons/message/CommentArea";
import Loader from "../../components/Loader";
import { timeCalc } from "../../utils/utils";
import _ from "lodash";

export default function Issue() {
	const currentContent = useSelector((state: RootState) => state.issue);
	const loginUser = useSelector((state: RootState) => state.login);
	const dispatch = useDispatch();
	const { number } = useParams();
	const [createComment] = useCreateCommentMutation();
	const observer = useRef<IntersectionObserver | null>(null);
	const [fixedHeaderStatus, setFixedHeaderStatus] = useState(false);
	const [participant, setParticipant] = useState<
		({ name: string | undefined; img: string | undefined } | undefined)[]
	>([]);

	if (!loginUser.login) {
		return (
			<>
				<Navigate to="/" replace />
			</>
		);
	}

	function handleCreateComment() {
		createComment({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			number: number,
			body: currentContent.body,
		});
		dispatch(resetAll());
	}

	const headerBottom = useCallback((node: HTMLDivElement) => {
		if (node) {
			const options = {
				rootMargin: "0px",
				threshold: 0,
			};
			const callback = (entries: IntersectionObserverEntry[]) => {
				if (entries[0].isIntersecting) {
					setFixedHeaderStatus(false);
				} else {
					setFixedHeaderStatus(true);
				}
			};
			observer.current = new IntersectionObserver(callback, options);
			observer.current.observe(node);
		}
	}, []);

	const { data: issueData, isSuccess } = useGetIssueQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
		number: number,
	});

	const { data: commentData } = useGetCommentQuery({
		owner: loginUser.login,
		repo: localStorage.getItem("repo"),
		number: number,
	});

	useEffect(() => {
		dispatch(
			setDefaultLabels(issueData?.labels.map((item) => item.name) || [])
		);
	}, [issueData?.labels]);

	useEffect(() => {
		dispatch(
			setDefaultAssignees(issueData?.assignees.map((item) => item.login) || [])
		);
	}, [issueData?.assignees]);

	useEffect(() => {
		const issueUser = [
			{ name: issueData?.user.login, img: issueData?.user.avatar_url },
		];
		const commentUser = commentData?.map((item) => ({
			name: item.user.login,
			img: item.user.avatar_url,
		}));
		const allUser = [...issueUser, ...(commentUser || [])];
		setParticipant(_.uniqWith(allUser, _.isEqual));
	}, [commentData, issueData]);

	if (!isSuccess) {
		return <Loader />;
	}

	return (
		<div className="w-[100%] max-w-[1280px] my-4 L:mx-[auto] px-4 L:px-6 XL:px-8">
			<header
				className={`${
					fixedHeaderStatus ? "block" : "hidden"
				} fixed top-0 left-0 right-0 z-[200] flex  border-0 border-b border-solid border-[#d1d5da] bg-white p-3 text-[#57606a]`}
			>
				<div className="mr-1 flex whitespace-nowrap">
					<StatusTag
						status={issueData?.state}
						statusReason={issueData?.state_reason}
					/>
				</div>
				<div className="flex flex-col justify-between truncate ml-1">
					<h1 className="text-[14px] font-medium leading-[1.3] text-[#24292f]">
						{issueData.title}
						<span className="font-normal pl-1">#{issueData.number}</span>
					</h1>
					<p className="text-[12px] ">
						<button className="mr-[4px] font-medium text-textGray">
							{issueData.user.login}
						</button>
						<span className="text-textGray">
							opened this issue {timeCalc(issueData.created_at)} ．
							{issueData.comments} comments
						</span>
					</p>
				</div>
			</header>

			<div className=" py-2 ">
				<IssueTitle
					defaultTitle={issueData?.title}
					number={issueData?.number.toString() || ""}
				/>
			</div>
			<div
				className="flex flex-wrap items-center mb-2 pb-4 w-[auto] text-sm text-[#57606a] border-0 border-b border-[#d1d5da] border-solid"
				ref={headerBottom}
			>
				<div className="mb-2">
					<StatusTag
						status={issueData?.state}
						statusReason={issueData?.state_reason}
					/>
				</div>
				<p className="flex flex-wrap pl-2 mb-2">
					<strong className="mr-1">{issueData?.user.login}</strong> opened this
					issue
					<p className="mx-1">{timeCalc(issueData?.created_at || "")}</p> ·
					<p className="mx-1">{issueData?.comments}</p>
					comments
				</p>
			</div>
			<div className="py-2 border-0 border-b border-[#d1d5da] border-solid L:hidden">
				<DataBar
					labelsData={issueData?.labels}
					assigneesData={issueData?.assignees}
				/>
			</div>

			<div className="w-[100%] mt-2 py-4 L:flex ">
				<div className="w-[100%]">
					<div className="flex w-[100%] mb-10 ">
						<CommentArea
							type="issue"
							number={number}
							login={issueData?.user.login}
							img={issueData?.user.avatar_url}
							time={timeCalc(issueData?.created_at || "")}
							handleBody={handleBody}
							submitText="Update comment"
							defaultBody={issueData?.body}
							submitFunc={() => console.log("submit")}
							hight="s"
							self={loginUser.login === issueData.user.login}
							reactions={{ reactions: { ...issueData?.reactions } }}
							first
						/>
					</div>
					<div
						className={`${
							commentData?.length === 0 ? "invisible" : "block"
						} w-[100%] space-y-10 `}
					>
						{commentData?.map((item) => (
							<CommentArea
								type="comment"
								key={item.id}
								id={item.id}
								login={item?.user.login}
								img={item?.user.avatar_url}
								time={timeCalc(item.created_at || "")}
								handleBody={handleBody}
								submitText="Update comment"
								defaultBody={item.body}
								submitFunc={() => {
									console.log("submit");
								}}
								hight="s"
								self={loginUser.login === item.user.login}
								reactions={{ reactions: { ...item.reactions } }}
								owner={issueData?.user.login}
							/>
						))}
					</div>
					<div className="flex w-[100%] pt-6 mt-5 border-0 border-t-2 border-solid border-[#d1d5da]">
						<CreateArea
							type="comment"
							handleTitle={handleTitle}
							handleBody={handleIssueBody}
							submitText="Comment"
							defaultBody={currentContent.body || ""}
							submitFunc={handleCreateComment}
							hight="s"
							commentMode={true}
							state={issueData.state}
							stateReason={issueData.state_reason}
							img={loginUser.avatar_url}
						/>
					</div>
				</div>
				<div className="mt-8 L:mt-0 L:ml-4 XL:ml-6">
					<RightFuncBar
						labelsData={issueData?.labels}
						assigneesData={issueData?.assignees}
						participant={participant}
					/>
				</div>
			</div>
		</div>
	);
}
