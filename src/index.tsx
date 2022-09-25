import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					{/* <Route index element={<Issues />} />
				<Route path="issue/:id" element={<Issue />} />
				<Route path="new_issue" element={<NewIssue />} />
				<Route path="label" element={<Labels />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);