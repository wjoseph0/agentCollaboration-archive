import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			}
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
};

export default config;
