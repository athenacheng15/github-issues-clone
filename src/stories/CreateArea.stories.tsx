import React from "react";
import { handleTitle, handleBody } from "../app/newIssueSlice";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CreateArea from "../components/commons/message/CreateArea";
import { Provider } from "react-redux";
import { store } from "../app/store";

export default {
	title: "block/CreateArea",
	component: CreateArea,
} as ComponentMeta<typeof CreateArea>;

const Template: ComponentStory<typeof CreateArea> = (args) => (
	<Provider store={store}>
		<div className="w-[800px]">
			<CreateArea {...args} />
		</div>
	</Provider>
);
export const Default = Template.bind({});

Default.args = {
	type: "issue",
	title: true,
	state: "Write",
	handleBody,
	handleTitle,
	img: "https://avatars.githubusercontent.com/u/64196504?v=4",
	submitText: "Submit new issue",
};
