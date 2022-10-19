import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NormalBtn from "../components/commons/buttons/NormalBtn";

export default {
	title: "buttons/NormalBtn",
	component: NormalBtn,
	argTypes: {
		colorType: {
			options: ["green", "white"],
			control: { type: "radio" },
		},
	},
} as ComponentMeta<typeof NormalBtn>;

const Template: ComponentStory<typeof NormalBtn> = (args) => (
	<NormalBtn {...args} />
);
export const Green = Template.bind({});

Green.args = {
	text: "Create Label",
	colorType: "green",
	disabled: false,
};

export const White = Template.bind({});
White.args = {
	text: "Cancel",
	colorType: "white",
};
