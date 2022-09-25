import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectBox from "../commons/SelectBox";

export default {
	title: "SelectBox",
	component: SelectBox,
	parameters: {
		layout: "centered",
	},
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (args) => (
	<SelectBox {...args} />
);
export const Default = Template.bind({});

Default.args = {
	textList: [
		"Alphabetically",
		"Reverse alphabetically",
		"Most issues",
		"Fewest issues",
	],
	isShown: true,
};
