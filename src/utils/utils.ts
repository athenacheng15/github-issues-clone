export function getToken() {
	const supaBaseData = JSON.parse(
		localStorage.getItem("supabase.auth.token") || ""
	);
	const userToken = supaBaseData.currentSession.provider_token;
	return userToken;
}

export function lightOrDark(color: string) {
	const r = parseInt(color.slice(1, 3), 16);
	const g = parseInt(color.slice(3, 5), 16);
	const b = parseInt(color.slice(5, 7), 16);
	const hsp = r * 0.3 + g * 0.6 + b * 0.1;
	if (hsp > 127.5) {
		return "light";
	} else {
		return "dark";
	}
}

export function generateRendomColor() {
	return Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, "0");
}

export function timeCalc(time: string) {
	const createdTime = new Date(time).getTime();
	const nowTime = +new Date();
	const timeDiff = Math.floor((nowTime - createdTime) / 1000);

	const monthNamesEn = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	if (timeDiff < 10) {
		return "now";
	} else if (timeDiff < 60) {
		return `${timeDiff} seconds ago`;
	} else if (timeDiff < 3600) {
		return `${Math.ceil(timeDiff / 60)} minutes ago`;
	} else if (timeDiff < 86400) {
		return `${Math.ceil(timeDiff / 3600)} hours ago`;
	} else if (timeDiff < 2592000) {
		return `${Math.ceil(timeDiff / 86400)} days ago`;
	} else {
		return `${new Date(time).getDate()} ${
			monthNamesEn[new Date(time).getMonth()]
		}`;
	}
}

export function timeCalc2(time: string) {
	const monthNamesEn = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	return `${monthNamesEn[new Date(time).getMonth()]} ${new Date(
		time
	).getDate()}`;
}
