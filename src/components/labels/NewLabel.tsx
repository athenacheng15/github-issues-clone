import styled from "styled-components";
import Label from "./Label";
import CreateBar from "./CreateBar";

export default function NewLabel() {
	return (
		<>
			<Wrapper>
				<Label labelText="Label preview" bgColor="#DBC0CB" />
				<CreateBar />
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 150px;
	border: solid 1px #d1d5da;
	border-radius: 6px;
	background-color: #f6f8fa;
	margin-bottom: 16px;
	padding: 16px;
`;
