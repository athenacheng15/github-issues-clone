import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tag from "../components/commons/tags/Tag";

export default {
	title: "tags/Tag",
	component: Tag,
	argTypes: {
		text: {
			options: ["Owner", "Author", "Collaborator"],
			control: { type: "radio" },
		},
	},
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;
export const Default = Template.bind({});

Default.args = {
	text: "Owner",
	display: true,
};
