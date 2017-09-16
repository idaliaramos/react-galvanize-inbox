/* eslint-disable import/first */
import deleteMessageThunk from './deleteMessageThunk';

jest.mock('../../api/deleteMessage');
import deleteMessage from '../../api/deleteMessage';

import data from '../../data/index.js';

describe('deleteMessageThunk', () => {
  it('Calls deleteMessage,dispatches DELETE_MESSAGE action', () => {
    const thunk = deleteMessageThunk(data.messages[0].id);
    expect(typeof thunk).toBe('function');
    deleteMessage.mockReturnValueOnce(
      Promise.resolve('how do i know WHAT TO PUT HERE')
    );
    const dispatch = jest.fn();
    const getState = () => ({});
    return thunk(dispatch, getState, {}).then(() => {
      expect(deleteMessage).toBeCalled();
      expect(dispatch).toBeCalledWith({
        type: 'DELETE_MESSAGE',
        messageId: data.messages[0].id
      });
    });
  });
});
