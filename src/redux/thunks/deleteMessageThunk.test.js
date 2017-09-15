/* eslint-disable import/first */
import deleteMessageThunk from './deleteMessageThunk';

jest.mock('../../api/deleteMessage');
import deleteMessage from '../../api/deleteMessage';

// import data from '../../data/index.js';
let messages: [
  {
    id: 1001,
    title: 'Note A',
    body: 'Quick zephyrs blow, jug of bad milk.',
    starred: true,
    read: true
  },
  {
    id: 1002,
    title: 'Note B',
    body: 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim.',
    starred: true,
    read: true
  },
  {
    id: 1003,
    title: 'Note C',
    body: 'Jeoparks fun TV quiz game',
    starred: true,
    read: true
  }
];

describe('deleteMessageThunk', () => {
  it('Calls deleteMessage,dispatches DELETE_MESSAGE action', () => {
    const thunk = deleteMessageThunk(messages[0].id);
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
        messageId: messages[0].id
      });
    });
  });
});
