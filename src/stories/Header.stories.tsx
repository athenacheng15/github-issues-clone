import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "../components/header/Header";
import "../../.storybook/test.css";

export default {
	title: "Header",
	component: Header,
	parameters: {
		layout: "fullscreen",
	},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
	<div>
		<Header />
	</div>
);
export const Default = Template.bind({});
