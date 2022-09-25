export interface RepoLabels {
	color: string;
	defaule: boolean;
	description: string;
	id: number;
	name: string;
	node_id: string;
	url: string;
}

export interface NewLabel {
	user: string;
	repo: string;
	name: string;
	new_name: string;
	description: string;
	color: string;
}

export interface LabelProps {
	labelText: string;
	bgColor: string;
}

// export interface CreateLabelKey {
// 	name: string;
// 	description: string;
// 	color: string;
// }

export interface EditLabelKey {
	// new_name?: string;
	name: string;
	description: string;
	color: string;
}
