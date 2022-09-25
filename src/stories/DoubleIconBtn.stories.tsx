import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DoubleIconBtn from "../commons/DoubleIconBtn";
import { TagIcon, MilestoneIcon } from "@primer/octicons-react";

export default {
	title: "DoubleIconBtn",
	component: DoubleIconBtn,
	argTypes: {
		icon1: {
			table: { disable: true },
		},
		icon2: {
			table: { disable: true },
		},
	},
} as ComponentMeta<typeof DoubleIconBtn>;

const Template: ComponentStory<typeof DoubleIconBtn> = (args) => (
	<DoubleIconBtn {...args} />
);
export const Default = Template.bind({});

Default.args = {
	icon1: <TagIcon />,
	text1: "Labels",
	icon2: <MilestoneIcon />,
	text2: "Milestone",
};
