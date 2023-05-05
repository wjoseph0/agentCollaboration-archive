import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

const pwaManifest = {
	name: "Agentpad",
	short_name: "Agentpad",
	description: "Real estate collaboration software",
	theme_color: '#11191f',
	background_color: "#ffffff",
	orientation: "portrait",
	display: "standalone",
	start_url: "/app",
	id: "/app",
	icons: [
		{
			"src": "/logo-maskable.png",
			"sizes": "192x192",
			"type": "image/png",
			"purpose": "maskable any"
		}
	]
}

const pwaConfiguration = {
	outDir: './static',
	includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'dist/*'],
	base: '/',
	scope: '/',
	manifest: pwaManifest
}

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA(pwaConfiguration)]
});
