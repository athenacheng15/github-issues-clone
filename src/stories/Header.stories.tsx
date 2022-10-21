import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "../components/header/Header";
import "../../.storybook/test.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";

export default {
	title: "block/Header",
	component: Header,
	parameters: {
		layout: "fullscreen",
	},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Header />
		</BrowserRouter>
	</Provider>
);
export const Default = Template.bind({});
