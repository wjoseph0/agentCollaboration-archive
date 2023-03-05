import { pb } from '$lib/pocketbase'

export async function load() {
    return {
        files: await pb.collection('files').getFullList(200, {
            sort: '-created'
        })
    };
};