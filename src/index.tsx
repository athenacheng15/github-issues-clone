import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import LoginPage from "./components/LoginPage";
import Labels from "./pages/labels/Labels";
import Issues from "./pages/issues/Issues";
import NewIssue from "./pages/new_issue/NewIssue";
import Issue from "./pages/issue/Issue";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<LoginPage />} />
					<Route path="issues" element={<Issues />} />
					<Route path="issues/new" element={<NewIssue />} />
					<Route path="issues/:number" element={<Issue />} />
					<Route path="labels" element={<Labels />} />
					<Route path="*" element={<Navigate to="/issues" replace />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);
