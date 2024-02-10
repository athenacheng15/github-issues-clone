import { DefaultRepoIssues } from "../models/IssuesType";
import { labelsApi } from "./labelsApi";

interface CreateIssueParams {
	owner: string | null;
	repo: string | null;
	content: ContentState;
}

interface ContentState {
	title: string;
	body: string;
	assignees: string[];
	labels: string[];
}

export const newIssuesApi = labelsApi.injectEndpoints({
	endpoints: (builder) => ({
		createIssue: builder.mutation<DefaultRepoIssues[], CreateIssueParams>({
			query: ({ owner, repo, content }) => ({
				url: `/repos/${owner}/${repo}/issues`,
				method: "POST",
				body: content,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			invalidatesTags: ["Issue", "Issues"],
		}),
	}),
	overrideExisting: false,
});

export const { useCreateIssueMutation } = newIssuesApi;
