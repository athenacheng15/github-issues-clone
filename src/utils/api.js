const api = {
	hostname: "https://api.github.com/repos/athenacheng15/issue_test",
	async getLabels() {
		const response = await fetch(`${this.hostname}/labels`);
		return await response.json();
	},
};

export default api;
