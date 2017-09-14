import createMessage from '../../api/createMessage';

export default function createMessageThunk(message) {
  return (dispatch, getState, env) => {
    return createMessage(message, {
      databaseId: env.AIRTABLE_DATABASE_ID,
      token: env.AIRTABLE_TOKEN
    }).then(createdMessage => {
      dispatch({ type: 'CREATE_MESSAGE_COMPLETED', message: createdMessage });
      return createdMessage;
    });
    // .catch(error => {
    //   dispatch({ type: 'CREATE_MESSAGE_FAILED' });
    // });
  };
}
