import { RepoLabels } from "./LabelsType";

export interface DefaultRepoIssues {
	url: string;
	repository_url: string;
	labels_url: string;
	comments_url: string;
	events_url: string;
	html_url: string;
	id: number;
	node_id: string;
	number: number;
	state?: string;
	title: string;
	body: string;
	user: UserDefaultData;
	labels: RepoLabels[];
	assignee?: UserDefaultData;
	assignees: UserDefaultData[];
	milestone: MilestoneDefaultData;
	comments: number;
	created_at: string;
	updated_at: string;
	closed_at: string | null;
	closed_by?: UserDefaultData[];
	author_association: string;
	active_lock_reason: string | null;
	reactions: ReactionDefaultData;
	timeline_url: string;
	performed_via_github_app: null;
	state_reason: string | null;
}

export interface UserDefaultData {
	login: string;
	id?: number;
	node_id?: string;
	avatar_url: string;
	gravatar_id?: string;
	url?: string;
	html_url?: string;
	followers_url?: string;
	following_url?: string;
	gists_url?: string;
	starred_url?: string;
	subscriptions_url?: string;
	organizations_url?: string;
	repos_url?: string;
	events_url?: string;
	received_events_url?: string;
	type?: string;
	site_admin?: boolean;
}

export interface MilestoneDefaultData {
	url: string;
	html_url: string;
	labels_url: string;
	id: number;
	node_id: string;
	number: number;
	state: string;
	title: string;
	description: string;
	creator: UserDefaultData;
	open_issues: number;
	closed_issues: number;
	created_at: string;
	updated_at: string;
	closed_at: string;
	due_on: string;
}

export interface ReactionDefaultData {
	url: string;
	total_count: number;
	"+1": number;
	"-1": number;
	laugh: number;
	hooray: number;
	confused: number;
	heart: number;
	rocket: number;
	eyes: number;
}
