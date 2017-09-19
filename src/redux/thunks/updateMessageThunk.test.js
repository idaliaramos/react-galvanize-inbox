/* eslint-disable import/first */
import updateMessageThunk from './updateMessageThunk';

jest.mock('../../api/updateMessage');
import updateMessage from '../../api/updateMessage';

import data from '../../data/index.js';

describe('updateMessageThunk', () => {
  it('Calls updateMessage,dispatches UPDATE_MESSAGE action', () => {
    const { id, ...changes } = data.messages[0];
    const thunk = updateMessageThunk(id, changes);

    console.log(data.messages[0].id);

    expect(typeof thunk).toBe('function');
    updateMessage.mockReturnValueOnce(
      Promise.resolve('how do i know WHAT TO PUT HERE')
    );
    const dispatch = jest.fn();
    const getState = () => ({});
    return thunk(dispatch, getState, {}).then(updatedMessage => {
      expect(updateMessage).toBeCalled();
      expect(updatedMessage).toEqual({ ...data.messages[0] });
      expect(dispatch).toBeCalledWith({
        type: 'UPDATE_MESSAGE',
        message: updatedMessage
      });
    });
  });
});

//
// jest.mock('../../api/updateNote');
// import updateNote from '../../api/updateNote';
//
// import data from '../../mock-data';
//
// describe('updateNoteProcess', () => {
//   it('Calls updateNote API utility, returns the updated created note, and dispatches UPDATE_NOTE_COMPLETED action', () => {
//     const { id, ...changes } = data.notes[0];
//     const thunk = updateNoteProcess(id, changes);
//     expect(typeof thunk).toBe('function');
//
//     updateNote.mockReturnValueOnce(Promise.resolve({ ...data.notes[0] }));
//
//     const dispatch = jest.fn();
//     const getState = () => ({});
//
//     return thunk(dispatch, getState, {}).then(updatedNote => {
//       expect(updateNote).toBeCalled();
//       expect(updatedNote).toEqual({ ...data.notes[0] });
//       expect(dispatch).toBeCalledWith({
//         type: 'UPDATE_NOTE_COMPLETED',
//         note: updatedNote
//       });
//     });
//   });
// });
