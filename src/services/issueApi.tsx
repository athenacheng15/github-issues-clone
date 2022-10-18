import { IssueType } from "../models/IssueType";
import { CommentType } from "../models/CommentType";
import { mainApi } from "./mainApi";

interface GetIssueParams {
	owner: string | null;
	repo: string | null;
	number?: string;
}

interface EditLabelParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	labels?: string[];
}

interface EditAssigneesParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	assignees?: string[];
}

interface EditTitleParams {
	owner: string | null;
	repo: string | null;
	number: string;
	title?: string;
}

interface DelCommentParams {
	owner: string | null;
	repo: string | null;
	id?: string;
}

interface EditCommentParams {
	owner: string | null;
	repo: string | null;
	id?: string;
	body?: string;
}

interface EditIssueParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	body?: string;
}

interface EditIssueStateParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	state?: string;
	state_reason?: string;
}

interface CreateCommentParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	body?: string;
}

export const issueApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getIssue: builder.query<IssueType, GetIssueParams>({
			query: ({ owner, repo, number }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
			}),
			providesTags: ["Issue"],
		}),
		getComment: builder.query<CommentType[], GetIssueParams>({
			query: ({ owner, repo, number }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}/comments`,
			}),
			providesTags: ["Issue"],
		}),
		updateLabel: builder.mutation<void, EditLabelParams>({
			query: ({ owner, repo, number, labels }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { labels },
			}),
			invalidatesTags: ["Issue"],
		}),
		updateAssignee: builder.mutation<void, EditAssigneesParams>({
			query: ({ owner, repo, number, assignees }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { assignees },
			}),
			invalidatesTags: ["Issue"],
		}),
		updateTitle: builder.mutation<void, EditTitleParams>({
			query: ({ owner, repo, number, title }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { title },
			}),
			invalidatesTags: ["Issue"],
		}),

		editIssue: builder.mutation<void, EditIssueParams>({
			query: ({ owner, repo, number, body }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { body },
			}),
			invalidatesTags: ["Issue"],
		}),
		editIssueState: builder.mutation<void, EditIssueStateParams>({
			query: ({ owner, repo, number, state, state_reason }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { state, state_reason },
			}),
			invalidatesTags: ["Issue"],
		}),
		createComment: builder.mutation<void, CreateCommentParams>({
			query: ({ owner, repo, number, body }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}/comments`,
				method: "POST",
				body: { body },
			}),
			invalidatesTags: ["Issue"],
		}),
		editComment: builder.mutation<void, EditCommentParams>({
			query: ({ owner, repo, id, body }) => ({
				url: `/repos/${owner}/${repo}/issues/comments/${id}`,
				method: "PATCH",
				body: { body },
			}),
			invalidatesTags: ["Issue"],
		}),
		deleteComment: builder.mutation<void, DelCommentParams>({
			query: ({ owner, repo, id }) => ({
				url: `/repos/${owner}/${repo}/issues/comments/${id}`,
				method: "DELETE",
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
	useUpdateTitleMutation,
	useEditIssueMutation,
	useEditIssueStateMutation,
	useCreateCommentMutation,
	useEditCommentMutation,
	useDeleteCommentMutation,
} = issueApi;
