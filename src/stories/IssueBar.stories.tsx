import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IssueBar from "../components/issues/IssueBar";

export default {
	title: "IssueBar",
	component: IssueBar,

	argTypes: {
		iconState: {
			options: ["open", "closed"],
			control: { type: "radio" },
		},
		stateReason: {
			options: ["completed", "no planned"],
			control: { type: "radio" },
		},
	},
} as ComponentMeta<typeof IssueBar>;

const Template: ComponentStory<typeof IssueBar> = (args) => (
	<div className="flex width-[500px]">
		<IssueBar {...args} />
	</div>
);
export const Default = Template.bind({});

Default.args = {
	title: "Issue Title",
	labels: [{ id: 1, name: "label preview", color: "443ca2", description: "" }],
	number: 1,
	user: { login: "jennie" },
	assignees: [
		{
			login: "athenacheng15",
			avatar_url: "https://avatars.githubusercontent.com/u/64196504?v=4",
		},
	],
	comments: 5,
	iconState: "open",
	stateReason: "",
	time: "2022-09-29T06:14:25Z",
};
