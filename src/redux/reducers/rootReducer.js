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

    case 'Mark_As_Unread':
      let newSetofMessages = currentState.messages.splice(0);
      newSetofMessages.filter(message =>
        currentState.selectedMessageIds.includes(message.id)
      );
      newSetofMessages.forEach(message => (message.read = false));
      return {
        ...currentState,
        messages: newSetofMessages
      };

    case 'Add-Label':
      return;

    case 'Remove_Label':
      return;

    case 'Add_New_Message':
      return {
        ...currentState,
        messages: [
          { subject: action.subject, body: action.body },
          ...currentState.messages
        ]
      };

    case 'Remove_Message':
      let newMessagestoRemove = currentState.messages.splice(0);
      let nMR = newMessagestoRemove.filter(
        message => !currentState.selectedMessageIds.includes(action.messageId)
      );
      return {
        ...currentState,
        messages: nMR
      };

    //
    // .then(() =>
    //   this.setState(prevState => {
    //     let newMessages = prevState.messages.splice(0);
    //     let updatedMessages = newMessages.filter(
    //       message => !prevState.selectedMessageIds.includes(message.id)
    //     );
    //     return {
    //       messages: updatedMessages
    //     };
    //   })
    // )

    default:
      return currentState;
  }
}
