import { DefaultRepoIssues, UserDefaultData } from "../models/IssuesType";
import { labelsApi } from "./labelsApi";

interface GetIssuesParams {
	owner: string;
	repo: string;
	query: IssueQueryStringState;
}

interface GetAssigneeParams {
	owner: string;
	repo: string;
}

interface IssueQueryStringState {
	issueStatus?: string;
	labels?: string[];
	assignee?: string;
	sort?: string;
}

export const issuesApi = labelsApi.injectEndpoints({
	endpoints: (builder) => ({
		getIssues: builder.query<DefaultRepoIssues[], GetIssuesParams>({
			query: ({ owner, repo, query }) => ({
				url: `/${owner}/${repo}/issues?${query.issueStatus}${query.assignee}${query.sort}`,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			providesTags: ["Issues"],
		}),

		getAssignee: builder.query<UserDefaultData[], GetAssigneeParams>({
			query: ({ owner, repo }) => ({
				url: `/${owner}/${repo}/assignees`,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			providesTags: ["Issues"],
		}),
	}),
	overrideExisting: false,
});

export const { useGetIssuesQuery, useGetAssigneeQuery } = issuesApi;
