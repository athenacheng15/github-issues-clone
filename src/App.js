import React from "react";
import { Outlet } from "react-router-dom";
import { ResetStyle } from "./components/GlobalStyle";
import { GlobalFonts } from "./components/GlobalStyle";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<ResetStyle />
			<GlobalFonts />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
