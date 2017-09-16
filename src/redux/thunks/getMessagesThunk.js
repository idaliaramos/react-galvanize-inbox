import GetMessages from '../../api/GetMessages';

export default function getMessagesThunks() {
  return (dispatch, getState, env) => {
    // dispatch({ type: 'GET_MESSAGES_STARTED' });
    return GetMessages({
      databaseId: env.AIRTABLE_DATABASE_ID,
      token: env.AIRTABLE_TOKEN
    }).then(messages => {
      dispatch({ type: 'GET_MESSAGES_COMPLETED', messages });
      return messages;
    });
    // .catch(error => {
    //   dispatch({ type: 'GET_MESSAGES_FAILED' });
    // });
  };
}
