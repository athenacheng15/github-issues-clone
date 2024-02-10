import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BarTool from "../components/commons/BarTool";
import { Provider } from "react-redux";
import { store } from "../app/store";

export default {
	title: "others/BarTool",
	component: BarTool,
	argTypes: {
		button: {
			options: ["_button name", false],
			control: { type: "radio" },
		},
	},
} as ComponentMeta<typeof BarTool>;

const Template: ComponentStory<typeof BarTool> = (args) => (
	<Provider store={store}>
		<div className="w-[240px]">
			<BarTool {...args} />
		</div>
	</Provider>
);
export const Default = Template.bind({});

Default.args = {
	name: "labels",
	setting: true,
	defaultText: "None-yet",
};

export const LinkType = Template.bind({});

LinkType.args = {
	name: "labels",
	setting: true,
	link: "link name",
};
