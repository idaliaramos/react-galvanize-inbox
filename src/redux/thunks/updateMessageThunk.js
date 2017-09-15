import updateMessage from '../../api/updateMessage';

export default function updateMessageThunk(messageId, change) {
  return (dispatch, getState, env) => {
    return updateMessage(messageId, change, {
      databaseId: env.AIRTABLE_DATABASE_ID,
      token: env.AIRTABLE_TOKEN
    }).then(updatedMessage => {
      dispatch({ type: 'UPDATE_MESSAGE_COMPLETED', message: updatedMessage });
    });

    // .catch(error => {
    //   dispatch({ type: 'CREATE_MESSAGE_FAILED' });
    // });
  };
}
