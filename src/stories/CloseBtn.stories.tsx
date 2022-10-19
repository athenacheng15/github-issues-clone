import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CloseBtn from "../pages/issue/CloseBtn";
import { Provider } from "react-redux";
import { store } from "../app/store";

export default {
	title: "buttons/CloseBtn",
	component: CloseBtn,
	argTypes: {
		colorType: {
			options: ["green", "white"],
			control: { type: "radio" },
		},
	},
} as ComponentMeta<typeof CloseBtn>;

const Template: ComponentStory<typeof CloseBtn> = (args) => (
	<Provider store={store}>
		<CloseBtn {...args} />
	</Provider>
);
export const open = Template.bind({});

open.args = {
	state: "open",
	body: "",
};

export const closed = Template.bind({});

closed.args = {
	state: "closed",
	body: "",
};
