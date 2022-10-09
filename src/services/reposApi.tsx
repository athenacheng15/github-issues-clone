import { RepoType } from "../models/RepoType";
import { labelsApi } from "./labelsApi";

interface GetReposParams {
	username: string | null;
}

export const reposApi = labelsApi.injectEndpoints({
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
	overrideExisting: false,
});

export const { useGetReposQuery } = reposApi;
