import { RepoLabels, EditLabelKey } from "../models/LabelsType";
import { mainApi } from "./mainApi";

interface ManagerLabelParams {
	owner: string | null;
	repo: string | null;
	name?: string;
	label?: EditLabelKey;
}

export const labelsApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getLabels: builder.query<RepoLabels[], ManagerLabelParams>({
			query: ({ owner, repo }) => ({
				url: `/repos/${owner}/${repo}/labels`,
			}),
			providesTags: ["Label"],
		}),
		createLabel: builder.mutation<void, ManagerLabelParams>({
			query: ({ owner, repo, label }) => ({
				url: `/repos/${owner}/${repo}/labels`,
				method: "POST",
				body: label,
			}),
			invalidatesTags: ["Label"],
		}),
		editLabel: builder.mutation<void, ManagerLabelParams>({
			query: ({ owner, repo, name, label }) => ({
				url: `/repos/${owner}/${repo}/labels/${name}`,
				method: "PATCH",
				body: label,
			}),
			invalidatesTags: ["Label"],
		}),
		deleteLabels: builder.mutation<void, ManagerLabelParams>({
			query: ({ owner, repo, name }) => ({
				url: `/repos/${owner}/${repo}/labels/${name}`,
				method: "DELETE",
				body: { owner, repo, name },
			}),
			invalidatesTags: ["Label"],
		}),
	}),
});

export const {
	useGetLabelsQuery,
	useCreateLabelMutation,
	useEditLabelMutation,
	useDeleteLabelsMutation,
} = labelsApi;
