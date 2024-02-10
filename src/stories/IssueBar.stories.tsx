import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IssueBar from "../pages/issues/IssueBar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";

export default {
	title: "block/IssueBar",
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
		<BrowserRouter>
			<Provider store={store}>
				<IssueBar {...args} />
			</Provider>
		</BrowserRouter>
	</div>
);
export const Default = Template.bind({});

Default.args = {
	title: "Issue Title",
	labels: [{ id: 1, name: "label preview", color: "443ca2", description: "" }],
	number: 1,
	user: {
		login: "jennie",
		avatar_url: "https://avatars.githubusercontent.com/u/64196504?v=4",
	},
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
	body: "",
};
