import { RepoLabels, EditLabelKey } from "../models/LabelsType";
import { mainApi } from "./mainApi";

interface GetLabelParams {
	owner: string | null;
	repo: string | null;
}

interface CreateLabelParams {
	owner: string | null;
	repo: string | null;
	label: EditLabelKey;
}

interface EditLabelParams {
	owner: string | null;
	repo: string | null;
	name?: string;
	label: EditLabelKey;
}

interface DeleteLabelParams {
	owner: string | null;
	repo: string | null;
	name: string;
}

export const labelsApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getLabels: builder.query<RepoLabels[], GetLabelParams>({
			query: ({ owner, repo }) => ({
				url: `/repos/${owner}/${repo}/labels`,
			}),
			providesTags: ["Label"],
		}),
		createLabel: builder.mutation<void, CreateLabelParams>({
			query: ({ owner, repo, label }) => ({
				url: `/repos/${owner}/${repo}/labels`,
				method: "POST",
				body: label,
			}),
			invalidatesTags: ["Label"],
		}),
		editLabel: builder.mutation<void, EditLabelParams>({
			query: ({ owner, repo, name, label }) => ({
				url: `/repos/${owner}/${repo}/labels/${name}`,
				method: "PATCH",
				body: label,
			}),
			invalidatesTags: ["Label"],
		}),
		deleteLabels: builder.mutation<void, DeleteLabelParams>({
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
