import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IssueBar from "../components/issues/IssueBar";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Label from "../components/labels/Label";
import { useGetIssuesQuery } from "../services/issuesApi";
export default {
	title: "IssueBar",
	component: IssueBar,
} as ComponentMeta<typeof IssueBar>;

const { data } = useGetIssuesQuery({
	owner: "athenacheng15",
	repo: "issue_test",
	query: {},
});

const Template: ComponentStory<typeof IssueBar> = (args) => (
	<Provider store={store}>
		<IssueBar {...args} />
	</Provider>
);
export const Default = Template.bind({});

Default.args = {
	title: "青蛙到此一遊",
	number: 4,
	comments: 2,
	iconState: "open",
	time: "2 days ago",
};
