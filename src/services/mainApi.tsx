import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/utils";
import { RepoType } from "../models/RepoType";

interface GetReposParams {
	username: string | null;
}

export const mainApi = createApi({
	reducerPath: "mainApi",
	tagTypes: ["Label", "Issues", "Issue", "Repos"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.github.com",
		prepareHeaders: (headers) => {
			headers.set("Accept", "application/vnd.github+json");
			headers.set("Authorization", `Bearer ${getToken()}`);
			headers.set("If-None-Match", "");
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getRepos: builder.query<RepoType[], GetReposParams>({
			query: ({ username }) => ({
				url: `/users/${username}/repos`,
			}),
			providesTags: ["Repos"],
		}),
	}),
});

export const { useGetReposQuery } = mainApi;
