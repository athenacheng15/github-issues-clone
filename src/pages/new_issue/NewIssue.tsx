import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useCreateIssueMutation } from "../../services/newIssueApi";
import { handleTitle, handleBody, resetAll } from "../../app/newIssueSlice";
import CreateArea from "../../components/commons/message/CreateArea";
import RightFuncBar from "./RightFuncBar";
import NormalBtn from "../../components/commons/buttons/NormalBtn";

export default function NewIssue() {
	const currentContent = useSelector((state: RootState) => state.contents);
	const loginUser = useSelector((state: RootState) => state.login);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [createIssue] = useCreateIssueMutation();

	function handleCreateIssue() {
		dispatch(handleBody(currentContent.body.replace(/\n\r?/g, "\n\r")));
		createIssue({
			owner: loginUser.login,
			repo: localStorage.getItem("repo"),
			content: currentContent,
		});
		dispatch(resetAll());
		navigate("/issues");
	}

	return (
		<>
			<div className="w-[100%] m-[auto] mt-2 p-4 max-w-[1280px] L:flex L:px-6 XL:px-8">
				<div className="flex w-[100%]">
					<CreateArea
						type="issue"
						handleTitle={handleTitle}
						handleBody={handleBody}
						submitFunc={handleCreateIssue}
						defaltTitle=""
						defaultBody=""
						title={true}
						hight="l"
						submitText="Submit new Issue"
						img={loginUser.avatar_url}
					/>
				</div>
				<div className="mt-8 L:mt-0 L:ml-4 XL:ml-6">
					<RightFuncBar />
				</div>
				<div className="L:hidden">
					<NormalBtn
						text="Submit new issue"
						width="100%"
						colorType="green"
						onClick={() => handleCreateIssue()}
						disabled={currentContent.title === ""}
					/>
				</div>
			</div>
		</>
	);
}
