import { DefaultRepoIssues, UserDefaultData } from "../models/IssuesType";
import { mainApi } from "./mainApi";

interface GetIssuesParams {
	owner: string | null;
	repo: string | null;
	query: IssueQueryStringState;
}

interface GetAssigneeParams {
	owner: string;
	repo: string;
}

interface IssueQueryStringState {
	issueStatus?: string;
	labels?: string;
	assignee?: string;
	sort?: string;
	filters?: string;
	page?: number | string;
}

export const issuesApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getIssues: builder.query<DefaultRepoIssues[], GetIssuesParams>({
			query: ({ owner, repo, query }) => ({
				url: `/repos/${owner}/${repo}/issues?${query.issueStatus}${query.labels}${query.assignee}${query.sort}${query.filters}${query.page}`,
			}),
			providesTags: ["Issues"],
		}),

		getAssignee: builder.query<UserDefaultData[], GetAssigneeParams>({
			query: ({ owner, repo }) => ({
				url: `/repos/${owner}/${repo}/assignees`,
			}),
			providesTags: ["Issues"],
		}),
	}),
	overrideExisting: false,
});

export const { useGetIssuesQuery, useGetAssigneeQuery } = issuesApi;
