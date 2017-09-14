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

    case 'Mark_As_Unstarred':
      let newUnstarredMessages = currentState.messages.slice(0);
      newUnstarredMessages.find(
        starredMessage => starredMessage.id === action.messageId
      ).starred = false;
      return {
        ...currentState,
        messages: newUnstarredMessages
      };

    case 'Mark_As_Read':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.messageId
              ? { ...message, read: true }
              : message
        )
      };

    case 'Mark_As_Unread':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.messageId
              ? { ...message, read: false }
              : message
        )
      };

    case 'Add_Label':
      let newLabelMessages = currentState.messages;
      newLabelMessages
        .find(message => message.id === action.id)
        .labels.push(action.label);
      return {
        ...currentState,
        messages: newLabelMessages
      };

    case 'Remove_Label':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.messageId
              ? {
                  ...message,
                  labels: message.labels.filter(
                    label => label !== action.labelToRemove
                  )
                }
              : message
        )
      };

    case 'Add_New_Message':
      return {
        ...currentState,
        messages: [
          { subject: action.subject, body: action.body, id: action.id },
          ...currentState.messages
        ]
      };

    case 'Remove_Message':
      // let newMessagestoRemove = currentState.messages.slice(0);
      // let nMR = newMessagestoRemove.filter(
      //   message => !currentState.selectedMessageIds.includes(action.messageId)
      // );
      // console.log(action, 'action is');
      // console.log(action.messageId, 'actionMessageId');
      // console.log(action.selectedMessageIds, 'Ids');
      // console.log(nMR, 'messages');
      // console.log(newMessagestoRemove, 'newMessagestoRemove');
      // let toDelete = currentState.messages.filter(
      //   message => message.id !== action.id
      // );

      return {
        ...currentState,
        messages: currentState.messages.filter(
          message => message.id !== action.messageId
        )
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
    case 'Close_Compose_Form':
      let closeComposeForm = currentState.newComposeForm;
      closeComposeForm = false;

      return {
        ...currentState,
        showComposeForm: closeComposeForm
      };

    case 'Open_Compose_Form':
      let openComposeForm = currentState.newComposeForm;
      openComposeForm = true;

      return {
        ...currentState,
        showComposeForm: openComposeForm
      };

    default:
      return currentState;
  }
}
