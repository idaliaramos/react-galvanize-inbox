export default function rootReducer(
  currentState = {
    messages: [],
    selected: false,
    selectedMessageIds: [],
    showComposeForm: null,
    unreadMessages: []
  },
  action
) {
  switch (action.type) {
    case 'Get_Messages':
      return {
        messages: action.messages,
        selectedMessageIds: [],
        showComposeForm: false
      };

    case 'Mark_As_Starred':
      let newMessages = currentState.messages.slice(0);
      newMessages.find(
        starredMessage => starredMessage.id === action.messageId
      ).starred = true;
      return {
        ...currentState,
        messages: newMessages
      };

    case 'Mark_As_Read':
      let newMarkAsReadMessages = currentState.messages.slice(0);
      newMarkAsReadMessages.find(
        readMessage => readMessage.id === action.messageId
      ).read = true;
      return {
        ...currentState,
        messages: newMarkAsReadMessages
      };

    // this.setState(prevState => {
    //   let newMessages = prevState.messages.slice(0);
    //   newMessages.find(
    //     readMessage => readMessage.id === messageId
    //   ).read = true;
    //   return {
    //     messages: newMessages,
    //     selectedMessageIds: []
    //   };
    // })

    case 'Mark_As_Unread':
      return;

    case 'Add-Label':
      return;

    case 'Remove_Label':
      return;
    case 'Add_New_Message':
      // let messages = currentState.messages;
      // messages.push({
      //   subject: action.subject,
      //   body: action.body
      // });
      // debugger;
      return {
        ...currentState,
        messages: [
          { subject: action.subject, body: action.body },
          ...currentState.messages
        ]
      };

    case 'Remove_Message':
      return;

    default:
      return currentState;
  }
}
