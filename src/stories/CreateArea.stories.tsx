import React from "react";
import { handleTitle, handleBody, resetAll } from "../app/newIssueSlice";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CreateArea from "../pages/new_issue/CreateArea";
import { Provider } from "react-redux";
import { store } from "../app/store";

export default {
	title: "CreateArea",
	component: CreateArea,
} as ComponentMeta<typeof CreateArea>;

const Template: ComponentStory<typeof CreateArea> = (args) => (
	<Provider store={store}>
		<div className="w-[600px]">
			<CreateArea {...args} />
		</div>
	</Provider>
);
export const Default = Template.bind({});

Default.args = {
	handleBody,
	handleTitle,
};
