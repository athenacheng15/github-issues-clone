import { IssueType } from "../models/IssueType";
import { CommentType } from "../models/CommentType";
import { mainApi } from "./mainApi";

interface ManagerSidebarParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	labels?: string[];
	assignees?: string[];
}

interface ManagerCommentParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	id?: string;
	body?: string;
}

interface ManagerIssueParams {
	owner: string | null;
	repo: string | null;
	number?: string;
	content?: {
		title?: string;
		body?: string;
		state?: string;
		state_reason?: string;
	};
}

export const issueApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getIssue: builder.query<IssueType, ManagerIssueParams>({
			query: ({ owner, repo, number }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
			}),
			providesTags: ["Issue"],
		}),
		getComment: builder.query<CommentType[], ManagerCommentParams>({
			query: ({ owner, repo, number }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}/comments`,
			}),
			providesTags: ["Issue"],
		}),
		updateLabel: builder.mutation<void, ManagerSidebarParams>({
			query: ({ owner, repo, number, labels }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { labels },
			}),
			invalidatesTags: ["Issue"],
		}),
		updateAssignee: builder.mutation<void, ManagerSidebarParams>({
			query: ({ owner, repo, number, assignees }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: { assignees },
			}),
			invalidatesTags: ["Issue"],
		}),

		editIssue: builder.mutation<void, ManagerIssueParams>({
			query: ({ owner, repo, number, content }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}`,
				method: "PATCH",
				body: content,
			}),
			invalidatesTags: ["Issue"],
		}),

		createComment: builder.mutation<void, ManagerCommentParams>({
			query: ({ owner, repo, number, body }) => ({
				url: `/repos/${owner}/${repo}/issues/${number}/comments`,
				method: "POST",
				body: { body },
			}),
			invalidatesTags: ["Issue"],
		}),
		editComment: builder.mutation<void, ManagerCommentParams>({
			query: ({ owner, repo, id, body }) => ({
				url: `/repos/${owner}/${repo}/issues/comments/${id}`,
				method: "PATCH",
				body: { body },
			}),
			invalidatesTags: ["Issue"],
		}),
		deleteComment: builder.mutation<void, ManagerCommentParams>({
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
	useEditIssueMutation,
	useCreateCommentMutation,
	useEditCommentMutation,
	useDeleteCommentMutation,
} = issueApi;
