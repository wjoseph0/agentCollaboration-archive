import { pb } from '$lib/pocketbase'

export async function load() {
  return {
    messages: await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user'
    })
  };
};