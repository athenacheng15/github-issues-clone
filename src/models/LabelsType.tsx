export interface RepoLabels {
	color: string;
	defaule?: boolean;
	description?: string;
	id: number;
	name: string;
	node_id?: string;
	url?: string;
}

export interface NewLabel {
	user: string;
	repo: string;
	name: string;
	new_name: string;
	description?: string;
	color: string;
}

export interface LabelProps {
	labelText?: string;
	bgColor: string;
	padding?: string;
}

export interface EditLabelKey {
	name?: string;
	new_name?: string;
	description?: string;
	color: string;
}
