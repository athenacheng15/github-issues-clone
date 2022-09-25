import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContentSearchBar from "../commons/ContentSearchBar";

export default {
	title: "ContentSearchBar",
	component: ContentSearchBar,
	parameters: {
		layout: "centered",
	},
} as ComponentMeta<typeof ContentSearchBar>;

const Template: ComponentStory<typeof ContentSearchBar> = () => (
	<ContentSearchBar />
);
export const Default = Template.bind({});
