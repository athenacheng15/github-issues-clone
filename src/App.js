import React from "react";
import { ResetStyle } from "./components/GlobalStyle";
import { GlobalFonts } from "./components/GlobalStyle";
import LoginBtn from "./components/LoginBtn";

function App() {
	return (
		<>
			<ResetStyle />
			<GlobalFonts />
			<LoginBtn />
		</>
	);
}

export default App;
