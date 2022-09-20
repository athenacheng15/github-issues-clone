import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				{/* <Route index element={<Issues />} />
				<Route path="issue/:id" element={<Issue />} />
				<Route path="new_issue" element={<NewIssue />} />
				<Route path="labels" element={<Labels />} /> */}
			</Route>
		</Routes>
	</BrowserRouter>
);
