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

    case 'UPDATE_MESSAGE_COMPLETED':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        ),
        selectedMessageIds: []
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

    case 'CREATE_MESSAGE_COMPLETED':
      return {
        ...currentState,
        messages: [action.message, ...currentState.messages]
      };

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

    case 'CLOSE_COMPOSE_FORM':
      let closeComposeForm = currentState.showComposeForm;
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
    case 'SELECT_MESSAGE':
      let newSelectedMessages = currentState.selectedMessageIds.slice(0);
      newSelectedMessages.push(action.messageId);
      return {
        ...currentState,
        selectedMessageIds: newSelectedMessages,
        selectedMessageCount: newSelectedMessages.length
      };
    case 'DESELECT_MESSAGE':
      let newSelectedMessageIds = currentState.selectedMessageIds.slice(0);
      let removeIndex = newSelectedMessageIds.indexOf(action.messageId);
      newSelectedMessageIds.splice(removeIndex, 1);
      return {
        ...currentState,
        selectedMessageIds: newSelectedMessageIds
        // selectedMessageCount: newSelectedMessageIds.length
      };

    //   return {
    //     selectedMessageIds: newSelectedMessageIds,
    //     selectedMessageCount: newSelectedMessageIds.length
    case 'DESELECT_ALL':
      return {
        ...currentState,
        selectedMessageIds: []
      };
    case 'SELECT_ALL':
      // let newSelectedMessageIds = currentState.selectedMessageIds.slice(0);
      // newSelectedMessageIds = action.messages.map(message => message.id);
      return {
        ...currentState,
        selectedMessageIds: currentState.messages.map(message => message.id)

        // this.setState(prevState => {
        //   let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
        //   newSelectedMessageIds = this.state.messages.map(message => message.id);
        //   return { selectedMessageIds: newSelectedMessageIds };
        // });
      };
    default:
      return currentState;
  }
}
