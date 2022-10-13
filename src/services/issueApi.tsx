import { IssueType } from "../models/IssueType";
import { CommentType } from "../models/CommentType";
import { labelsApi } from "./labelsApi";

interface GetIssueParams {
	owner: string | null;
	repo: string | null;
	number?: string;
}

interface EditLabelParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	labels: string[];
}

interface EditAssigneesParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	assignees: string[];
}

export const issueApi = labelsApi.injectEndpoints({
	endpoints: (builder) => ({
		getIssue: builder.query<IssueType, GetIssueParams>({
			query: ({ owner, repo, number }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			providesTags: ["Issue"],
		}),
		getComment: builder.query<CommentType[], GetIssueParams>({
			query: ({ owner, repo, number }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}/comments`,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			providesTags: ["Issue"],
		}),
		updateLabel: builder.mutation<void, EditLabelParams>({
			query: ({ owner, repo, number, labels }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { labels },
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			invalidatesTags: ["Issue"],
		}),
		updateAssignee: builder.mutation<void, EditAssigneesParams>({
			query: ({ owner, repo, number, assignees }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { assignees },
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			invalidatesTags: ["Issue"],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetIssueQuery,
	useGetCommentQuery,
	useUpdateLabelMutation,
	useUpdateAssigneeMutation,
} = issueApi;
