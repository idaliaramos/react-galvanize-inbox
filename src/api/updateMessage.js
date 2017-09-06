export default function updateMessage(messageId, change) {
  return fetch(
    `https://api.airtable.com/v0/appmho3DsLWsNz2E6/messages/${messageId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer key3qboRJqEMAfhtg',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: change
      })
    }
  )
    .then(response => response.json())
    .then(record => {
      console.log('this is the record', record);
      return {
        id: record.id,
        body: record.fields.body ? record.fields.body : 'there is no message',
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: record.fields.labels ? record.fields.labels.split(',') : []
      };
    });
}
