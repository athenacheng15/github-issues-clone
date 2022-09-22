import styled from "styled-components";
import { MarkGithubIcon } from "@primer/octicons-react";

export default function Footer() {
	return (
		<>
			<Wrapper>
				<FooterBox>
					<LogoBox>
						<MarkGithubIcon fill="#6e7781" size={24} />
						<CrText>© 2022 GitHub, Inc.</CrText>
					</LogoBox>
					<LinkBox>
						{linkList.map((item, index) => (
							<LinkText key={index}>{item}</LinkText>
						))}
					</LinkBox>
				</FooterBox>
			</Wrapper>
		</>
	);
}

const linkList = [
	"Terms",
	"Privacy",
	"Security",
	"Status",
	"Docs",
	"Contact GitHub",
	"Pricing",
	"API",
	"Training",
	"Blog",
	"About",
];

const Wrapper = styled.div`
	max-width: 1280px;
	width: 100%;
	margin: auto;
	padding: 0 16px;
	@media screen and (max-width: 1011px) {
		padding: 0 40px;
	}
	@media screen and (max-width: 543px) {
		padding: 0 16px;
	}
`;

const FooterBox = styled.div`
	margin-top: 24px;
	padding-top: 40px;
	padding-bottom: 48px;
	border-top: solid 1px rgb(209, 213, 218);
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

const LogoBox = styled.div`
	position: absolute;
	width: 145px;
	height: 26px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: 20px;
	margin-bottom: 8px;
	@media screen and (max-width: 1011px) {
		position: relative;
		width: 100%;
		justify-content: center;
	}
`;

const CrText = styled.p`
	font-size: 12px;
	font-weight: 500;
	color: #6e7781;

	@media screen and (max-width: 1011px) {
		margin-left: 10px;
	}
`;

const LinkBox = styled.div`
	width: 67%;
	height: 26px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	margin: auto;
	order: -1;
	margin-bottom: 8px;

	@media screen and (max-width: 1011px) {
		min-width: 628px;
		padding: 0px 16px;
	}
	@media screen and (max-width: 679px) {
		width: 100%;
		min-width: 150px;
		justify-content: center;
		height: auto;
	}
`;

const LinkText = styled.a`
	color: rgb(9, 105, 218);
	font-size: 12px;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
	@media screen and (max-width: 679px) {
		margin-right: 16px;
	}
`;
