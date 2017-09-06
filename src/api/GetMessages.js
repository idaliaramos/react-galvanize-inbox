export default function GetMessages() {
  return fetch('https://api.airtable.com/v0/appmho3DsLWsNz2E6/messages/', {
    headers: {
      Authorization: 'Bearer key3qboRJqEMAfhtg',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(messages => {
      return messages.records.map(message => {
        return {
          id: message.id,
          labels: message.fields.labels ? message.fields.labels.split(',') : [],
          read: message.fields.read,
          starred: message.fields.starred,
          subject: message.fields.subject
        };
      });
    });
}
