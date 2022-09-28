import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResultType } from "@remix-run/router/dist/utils";
import { DefaultRepoIssues } from "../models/IssuesType";
import { labelsApi } from "./labelsApi";

interface GetIssuesParams {
	owner: string;
	repo: string;
}

export const issuesApi = labelsApi.injectEndpoints({
	endpoints: (builder) => ({
		getIssues: builder.query<DefaultRepoIssues[], GetIssuesParams>({
			query: ({ owner, repo }) => ({
				url: `/${owner}/${repo}/issues`,
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
					Accept: "application/vnd.github+json",
				}),
			}),
			providesTags: ["Issues"],
		}),
	}),
	overrideExisting: false,
});

export const { useGetIssuesQuery } = issuesApi;
