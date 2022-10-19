import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatusTag from "../components/commons/tags/StatusTag";

export default {
	title: "tags/StatusTag",
	component: StatusTag,
} as ComponentMeta<typeof StatusTag>;

const Template: ComponentStory<typeof StatusTag> = (args) => (
	<StatusTag {...args} />
);
export const open = Template.bind({});

open.args = {
	status: "open",
};

export const completed = Template.bind({});
completed.args = {
	status: "closed",
	statusReason: "completed",
};

export const not_planned = Template.bind({});
not_planned.args = {
	status: "closed",
	statusReason: "not_Planned",
};
