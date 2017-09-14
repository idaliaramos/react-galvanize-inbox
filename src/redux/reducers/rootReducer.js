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
    case 'GET_MESSAGES_COMPLETED':
      return {
        messages: action.messages,
        selectedMessageIds: [],
        showComposeForm: false
      };

    // case 'Mark_As_Starred':
    //   let newMessages = currentState.messages.slice(0);
    //   newMessages.find(
    //     starredMessage => starredMessage.id === action.messageId
    //   ).starred = true;
    //   return {
    //     ...currentState,
    //     messages: newMessages
    //   };

    case 'UPDATE_MESSAGE_COMPLETED':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
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

    case 'ADD_NEW_MESSAGE':
      return {
        ...currentState,
        messages: [
          { subject: action.subject, body: action.body, id: action.id },
          ...currentState.messages
        ]
      };

    case 'CREATE_MESSAGE_COMPLETED':
      return {
        ...currentState,
        messages: [action.message, ...currentState.messages]
      };
    // case 'ADD_NEW_MESSAGE_COMPLETED':
    //   return {
    //     ...currentState,
    //     messages: [
    //       { subject: action.subject, body: action.body, id: action.id },
    //       ...currentState.messages
    //     ],
    //     selectedMessageId: action.message.id,
    //     isCreatingMessage: false
    //   };
    // case 'CREATE_MESSAGE_FAILED':
    //   return {
    //     ...currentState,
    //     isCreatingMessage: false,
    //     didCreatingMessageFail: true
    //   };

    case 'DELETE_MESSAGE':
      return {
        ...currentState,
        messages: currentState.messages.filter(
          message => message.id !== action.messageId
        )
      };
    case 'DELETE_MESSAGE_FAILED':
      return {
        ...currentState,
        isDeletingMessage: false,
        didDeletingMessageFail: true
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
