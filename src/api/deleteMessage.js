export default function deleteMessage(messageId) {
  return fetch(
    `https://api.airtable.com/v0/appmho3DsLWsNz2E6/messages/${messageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer key3qboRJqEMAfhtg',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          read: true
        }
      })
    }
  ).then(response => response.json());
}
