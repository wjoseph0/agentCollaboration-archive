export async function load({ params }) {
	if (params.agent) {
		return {
			agent: params.agent
		};
	}
}
