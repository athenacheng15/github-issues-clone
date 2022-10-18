import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/utils";
import { RepoType } from "../models/RepoType";

interface GetReposParams {
	username: string | null;
}

export const mainApi = createApi({
	reducerPath: "labelsApi",
	tagTypes: ["Label", "Issues", "Issue", "Repos"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.github.com",
		prepareHeaders: (headers) => {
			headers.set("Accept", "application/vnd.github+json");
			headers.set("Authorization", `Bearer ${getToken()}`);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getRepos: builder.query<RepoType[], GetReposParams>({
			query: ({ username }) => ({
				url: `/users/${username}/repos`,
				headers: new Headers({
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("supabase.auth.token") || "")
							.currentSession.provider_token
					}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			providesTags: ["Repos"],
		}),
	}),
});

export const { useGetReposQuery } = mainApi;
