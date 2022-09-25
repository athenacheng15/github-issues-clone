import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	LabelProps,
	RepoLabels,
	NewLabel,
	EditLabelKey,
} from "../models/LabelsType";

interface GetLabelParams {
	owner: string;
	repo: string;
}

interface CreateLabelParams {
	owner: string;
	repo: string;
	label: EditLabelKey;
}

interface EditLabelParams {
	owner: string;
	repo: string;
	name?: string;
	label: EditLabelKey;
}

interface DeleteLabelParams {
	owner: string;
	repo: string;
	name: string;
}

export const labelsApi = createApi({
	reducerPath: "labelsApi",
	tagTypes: ["Label"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.github.com/repos",
	}),
	endpoints: (builder) => ({
		getLabels: builder.query<RepoLabels[], GetLabelParams>({
			query: ({ owner, repo }) => `/${owner}/${repo}/labels`,
			providesTags: ["Label"],
		}),
		createLabel: builder.mutation<void, CreateLabelParams>({
			query: ({ owner, repo, label }) => ({
				url: `/${owner}/${repo}/labels`,
				method: "POST",
				body: label,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			invalidatesTags: ["Label"],
		}),
		editLabel: builder.mutation<void, EditLabelParams>({
			query: ({ owner, repo, name, label }) => ({
				url: `/${owner}/${repo}/labels/${name}`,
				method: "PATCH",
				body: label,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			invalidatesTags: ["Label"],
		}),
		deleteLabels: builder.mutation<void, DeleteLabelParams>({
			query: ({ owner, repo, name }) => ({
				url: `/${owner}/${repo}/labels/${name}`,
				method: "DELETE",
				body: { owner, repo, name },
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
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
