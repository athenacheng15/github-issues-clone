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
	return Math.floor(Math.random() * 16777215).toString(16);
}
