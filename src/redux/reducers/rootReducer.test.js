import rootReducer from './rootReducer';
// import data from '../../data';
let messages: [
  {
    id: 3,
    body: 'thisbody',
    title: 'thistitle'
  },
  {
    id: 0,
    body: 'body',
    title: 'title'
  },
  {
    id: 1,
    body: 'body',
    title: 'title'
  }
];

describe('test the rootReducer', () => {
  it('should test updated Message ', () => {
    let initialState = {
      messages: [
        {
          id: 0,
          read: false
        },
        {
          id: 1,
          read: false
        }
      ],
      selected: false
    };
    let action = {
      type: 'UPDATE_MESSAGE_COMPLETED',
      message: { id: 0, read: true }
    };
    let expectedResult = {
      messages: [
        {
          id: 0,
          read: true
        },
        {
          id: 1,
          read: false
        }
      ],
      selected: false
    };

    let result = rootReducer(initialState, action);

    //write expect statement for result
    expect(result).toEqual(expectedResult);
  });

  it('create a message', () => {
    let initialState = {
      messages: [
        {
          id: 0,
          body: 'body',
          title: 'title'
        },
        {
          id: 1,
          body: 'body',
          title: 'title'
        }
      ]
    };
    let action = {
      type: 'CREATE_MESSAGE_COMPLETED',
      message: {
        id: 3,
        body: 'thisbody',
        title: 'thistitle'
      }
    };
    let expectedResult = {
      messages: [
        {
          id: 3,
          body: 'thisbody',
          title: 'thistitle'
        },
        {
          id: 0,
          body: 'body',
          title: 'title'
        },
        {
          id: 1,
          body: 'body',
          title: 'title'
        }
      ]
    };

    let result = rootReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should delete a message', () => {
    let initialState = {
      messages: [
        {
          id: 0,
          body: 'body',
          title: 'title'
        },
        {
          id: 1,
          body: 'body',
          title: 'title'
        }
      ]
    };
    let action = {
      type: 'DELETE_MESSAGE',
      message: {
        id: 3,
        body: 'thisbody',
        title: 'thistitle'
      }
    };
    let expectedResult = {
      messages: [
        {
          id: 0,
          body: 'body',
          title: 'title'
        },
        {
          id: 1,
          body: 'body',
          title: 'title'
        }
      ]
    };

    let result = rootReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should get the messages', () => {
    let initialState = {
      messages: null
    };
    let action = {
      type: 'GET_MESSAGES',
      messages: messages
    };
    let expectedResult = {
      messages: messages
      // [
      //   {
      //     id: 3,
      //     body: 'thisbody',
      //     title: 'thistitle'
      //   },
      //   {
      //     id: 0,
      //     body: 'body',
      //     title: 'title'
      //   },
      //   {
      //     id: 1,
      //     body: 'body',
      //     title: 'title'
      //   },
      //   {
      //     id: 5,
      //     body: 'body',
      //     title: 'title'
      //   }
      // ]
    };

    let result = rootReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });
});
