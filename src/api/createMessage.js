export default function createMessage(message) {
  return fetch('https://api.airtable.com/v0/appmho3DsLWsNz2E6/messages/', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer key3qboRJqEMAfhtg',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: message
    })
  })
    .then(response => response.json())
    .then(record => {
      console.log(record, 'RECORD');
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
