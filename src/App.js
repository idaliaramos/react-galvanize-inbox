import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
// import GetMessages from './api/GetMessages';
// import deleteMessage from './api/deleteMessage';
import updateMessage from './api/updateMessage';
// import createMessage from './api/createMessage';
import createMessageThunk from './redux/thunks/createMessageThunk';
import updateMessageThunk from './redux/thunks/updateMessageThunk';
import deleteMessageThunk from './redux/thunks/deleteMessageThunk';
import getMessagesThunk from './redux/thunks/getMessagesThunk';

// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      selected: false,
      selectedMessageIds: [],
      showComposeForm: null,
      unreadMessages: []
    };

    this.props.store.subscribe(() => {
      this.setState(this.props.store.getState());
    });
  }

  render() {
    return (
      <div>
        <InboxPage
          selected={this.state.selected}
          messages={this.state.messages}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          showComposeForm={this.state.showComposeForm}
          selectedMessageIds={this.state.selectedMessageIds}
          onSelectMessage={this.onSelectMessage}
          onDeselectMessage={this.onDeselectMessage}
          onMarkAsReadMessage={this.onMarkAsReadMessage}
          unreadMessage={this.state.messages.map(
            message =>
              !message.read ? this.state.unreadMessages.push(message) : null
          )}
          onMarkAsUnreadSelectedMessages={this.onMarkAsUnreadSelectedMessages}
          onMarkAsReadSelectedMessages={this.onMarkAsReadSelectedMessages}
          onUnstarMessage={this.onUnstarMessage}
          onStarMessage={this.onStarMessage}
          onSelectAllMessages={this.onSelectAllMessages}
          onDeselectAllMessages={this.onDeselectAllMessages}
          onDeleteSelectedMessages={this.onDeleteSelectedMessages}
          onApplyLabelSelectedMessages={this.onApplyLabelSelectedMessages}
          onRemoveLabelSelectedMessages={this.onRemoveLabelSelectedMessages}
          onOpenComposeForm={this.onOpenComposeForm}
          updateUnreadMessages={this.updateUnreadMessages}
        />
      </div>
    );
  }

  onSubmit = message => {
    this.props.store.dispatch(createMessageThunk(message));
  };

  onSelectMessage = messageId => {
    this.setState(prevState => {
      let newSelected = prevState.selectedMessageIds.slice(0);
      newSelected.push(messageId);
      return {
        selectedMessageIds: newSelected,
        selectedMessageCount: newSelected.length
      };
    });
  };

  onDeselectMessage = messageId => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      let removeIndex = newSelectedMessageIds.indexOf(messageId);
      newSelectedMessageIds.splice(removeIndex, 1);
      return {
        selectedMessageIds: newSelectedMessageIds,
        selectedMessageCount: newSelectedMessageIds.length
      };
    });
  };

  onStarMessage = messageId => {
    // updateMessage(messageId, { starred: true }).then(res => {
    //   this.props.store.dispatch({ type: 'Mark_As_Starred', messageId });
    // });
    this.props.store.dispatch(updateMessageThunk(messageId, { starred: true }));
  };

  onUnstarMessage = messageId => {
    this.props.store.dispatch(
      updateMessageThunk(messageId, { starred: false })
    );
  };

  onMarkAsReadMessage = messageId => {
    this.props.store.dispatch(updateMessageThunk(messageId, { read: true }));
  };

  onMarkAsUnreadSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId =>
      updateMessage(messageId, { read: false }).then(() =>
        this.props.store.dispatch({ type: 'Mark_As_Unread', messageId })
      )
    );
  };

  onMarkAsReadSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      updateMessage(messageId, { read: true }).then(() => {
        this.props.store.dispatch({ type: 'Mark_As_Read', messageId });
      });
    });
  };

  onSelectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds = this.state.messages.map(message => message.id);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  onDeleteSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      console.log(this.state.selectedMessageIds);
      this.props.store.dispatch(deleteMessageThunk(messageId, { read: true }));
    });
  };

  onDeselectAllMessages = () => {
    this.setState({ selectedMessageIds: [] });
  };

  onApplyLabelSelectedMessages = label => {
    //if it includes the messageId
    let matchingMessages = this.state.messages.filter(message =>
      this.state.selectedMessageIds.includes(message.id)
    );
    //filter make sure it doesnt have the label
    matchingMessages.filter(message => !message.labels.includes(label));
    matchingMessages.forEach(message =>
      updateMessage(message.id, {
        labels: message.labels + ',' + label
      }).then(
        this.props.store.dispatch({
          type: 'Add_Label',
          id: message.id,
          label: label
        })
      )
    );
  };

  onRemoveLabelSelectedMessages = labelToRemove => {
    this.state.selectedMessageIds.forEach(messageId => {
      const message = this.state.messages.find(
        message => message.id === messageId
      );
      const newLabels = message.labels.filter(label => label !== labelToRemove);
      updateMessage(messageId, { labels: newLabels.join(',') }).then(() => {
        this.props.store.dispatch({
          type: 'Remove_Label',
          messageId,
          labelToRemove
        });
      });
    });
  };

  onOpenComposeForm = () => {
    if (this.state.showComposeForm) {
      this.props.store.dispatch({ type: 'Close_Compose_Form' });
    } else {
      this.props.store.dispatch({ type: 'Open_Compose_Form' });
    }
  };

  onCancel = () => {
    this.props.store.dispatch({ type: 'Close_Compose_Form' });
  };

  unreadMessage = () => {
    this.state.messages.map(
      message =>
        !message.read
          ? this.state.unreadMessages.push(message)
          : this.state.readMessages.push(message)
    );
  };

  componentDidMount() {
    // GetMessages().then(messages => {
    //   this.props.store.dispatch({ type: 'GET_MESSAGES', messages });
    // });
    this.props.store.dispatch(getMessagesThunk());
  }
}

export default App;
