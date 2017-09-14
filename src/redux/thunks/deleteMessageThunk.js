import deleteMessage from '../../api/deleteMessage';

export default function deleteMessageThunk(messageId) {
  return (dispatch, getState, env) => {
    dispatch({ type: 'DELETE_MESSAGE', messageId });
    return deleteMessage(messageId, {
      databaseId: env.AIRTABLE_DATABASE_ID,
      token: env.AIRTABLE_TOKEN
    })
      .then(() => {
        dispatch({ type: 'DELETE_MESSAGE_COMPLETED', messageId: messageId });
        return true;
      })
      .catch(error => {
        dispatch({ type: 'DELETE_MESSAGE_FAILED' });
      });
  };
}
