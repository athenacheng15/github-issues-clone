import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LabelProps, RepoLabels, NewLabel } from "../models/LabelsType";

interface GetLabelParams {
	user: string;
	repository: string;
}

interface CreateLabelParams {
	user: string;
	repository: string;
	label: LabelProps;
}

interface EditLabelParams {
	user: string;
	repository: string;
	labelName: string;
	newLabel: NewLabel;
}

interface DeleteLabelParams {
	user: string;
	repository: string;
	labelName: string;
}

export const labelsApi = createApi({
	reducerPath: "getLabelsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.github.com/repos",
	}),
	endpoints: (builder) => ({
		getLabels: builder.query<RepoLabels[], GetLabelParams>({
			query: ({ user, repository }) => `/${user}/${repository}/labels`,
		}),
		createLabels: builder.mutation<void, CreateLabelParams>({
			query: ({ user, repository, label }) => ({
				url: `/${user}/${repository}/labels`,
				method: "POST",
				body: label,
			}),
		}),
		editLabels: builder.mutation<void, EditLabelParams>({
			query: ({ user, repository, labelName, newLabel }) => ({
				url: `/${user}/${repository}/labels/${labelName}`,
				method: "PATCH",
				body: newLabel,
			}),
		}),
		deleteLabels: builder.mutation<void, DeleteLabelParams>({
			query: ({ user, repository, labelName }) => ({
				url: `/${user}/${repository}/labels/${labelName}`,
				method: "DELETE",
				body: { user, repository, labelName },
			}),
		}),
	}),
});

export const {
	useGetLabelsQuery,
	useCreateLabelsMutation,
	useEditLabelsMutation,
	useDeleteLabelsMutation,
} = labelsApi;
