import React from "react";
import { Outlet } from "react-router-dom";
import { ResetStyle } from "./components/GlobalStyle";
import { GlobalFonts } from "./components/GlobalStyle";

import Header from "./components/header/Header";
import SubTitle from "./components/subtitle/Subtitle";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Labels from "./components/labels/Labels";
import Issues from "./components/issues/Issues";

function App() {
	return (
		<>
			<ResetStyle />
			<GlobalFonts />
			<Header />
			<SubTitle />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
