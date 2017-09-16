/* eslint-disable import/first */
import createMessageThunk from './createMessageThunk';

jest.mock('../../api/createMessage');
import createMessage from '../../api/createMessage';

import data from '../../data/index.js';
describe('createMessageThunk', () => {
  console.log(data);
  it('Calls createMessage, returns a new created message, and dispatches CREATE_MESSAGE_COMPLETED action', () => {
    const { id, ...messageWithoutId } = data.messages[0];
    const thunk = createMessageThunk(messageWithoutId);
    expect(typeof thunk).toBe('function');
    createMessage.mockReturnValueOnce(Promise.resolve({ ...data.messages[0] }));
    const dispatch = jest.fn();
    const getState = () => ({});
    return thunk(dispatch, getState, {}).then(createdMessage => {
      expect(createMessage).toBeCalled();
      expect(createdMessage).toEqual({ ...data.messages[0] });
      expect(dispatch).toBeCalledWith({
        type: 'CREATE_MESSAGE_COMPLETED',
        message: createdMessage
      });
    });
  });
});
