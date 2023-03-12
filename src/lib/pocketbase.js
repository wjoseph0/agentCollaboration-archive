import Pocketbase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new Pocketbase('https://wjoseph0.cloud');

export const currentUser = writable(pb.authStore.model);

export const journey = writable();

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});
