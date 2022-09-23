import styled from "styled-components";

export default function CreateBar() {
	return <></>;
}

const formInputs = [
	{ label: "Label name", key: "name" },
	{ label: "Description", key: "description" },
	{ label: "Color", key: "color" },
];

const fontData = [];

const FormLegend = styled.legend`
	line-height: 19px;
	font-size: 16px;
	font-weight: bold;
	color: #3f3a3a;
	padding-bottom: 16px;
	border-bottom: 1px solid #3f3a3a;
	width: 100%;
`;

const FormGroup = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 30px;
	width: 684px;

	${FormLegend} + & {
		margin-top: 25px;
	}

	@media screen and (max-width: 1279px) {
		line-height: 17px;
		font-size: 14px;
		margin-top: 20px;
		width: 100%;

		${FormLegend} + & {
			margin-top: 20px;
		}
	}
`;

const FormLabel = styled.label`
	width: 110px;
	line-height: 19px;
	font-size: 16px;
	color: #3f3a3a;
	display: block;

	@media screen and (max-width: 1279px) {
		width: 100%;
	}
`;

const FormControl = styled.input`
	width: 574px;
	height: 30px;
	border-radius: 8px;
	border: solid 1px #979797;

	@media screen and (max-width: 1279px) {
		margin-top: 10px;
		width: 100%;
	}
`;
