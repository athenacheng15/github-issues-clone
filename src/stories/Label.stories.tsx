import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Label from "../components/commons/tags/Label";

export default {
	title: "tags/Label",
	component: Label,

	argTypes: {
		bgColor: {
			control: "text",
		},
	},
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;
export const Default = Template.bind({});

Default.args = {
	bgColor: "000000",
	labelText: "Label preview",
};
