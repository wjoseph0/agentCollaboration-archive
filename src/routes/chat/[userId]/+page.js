import { pb } from '$lib/pocketbase'

export async function load({ params }) {
  const filter = `(user = "${params.userId}") || (recipient = "${params.userId}") `;
  return {
    messages: await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
      filter: filter
    })
  };
};