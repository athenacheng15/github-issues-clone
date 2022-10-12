import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

import LoginPage from "./components/LoginPage";
import Labels from "./components/labels/Labels";
import Issues from "./components/issues/Issues";
import NewIssue from "./components/new_issue/NewIssue";
import Issue from "./components/issue/Issue";

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
					<Route path="issues/:id" element={<Issue />} />
					<Route path="labels" element={<Labels />} />
					{/* <Route path="*" element={<Navigate to="/" replace />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);
