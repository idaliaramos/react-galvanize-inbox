import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
import createMessageThunk from './redux/thunks/createMessageThunk';
import updateMessageThunk from './redux/thunks/updateMessageThunk';
import deleteMessageThunk from './redux/thunks/deleteMessageThunk';
import getMessagesThunk from './redux/thunks/getMessagesThunk';

// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.store.getState();

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
    this.props.store.dispatch({ type: 'CLOSE_COMPOSE_FORM' });
  };

  onSelectMessage = messageId => {
    this.props.store.dispatch({ type: 'SELECT_MESSAGE', messageId });
  };

  onDeselectMessage = messageId => {
    this.props.store.dispatch({ type: 'DESELECT_MESSAGE' });
  };

  onStarMessage = messageId => {
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
      this.props.store.dispatch(updateMessageThunk(messageId, { read: false }))
    );
  };

  onMarkAsReadSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      this.props.store.dispatch(updateMessageThunk(messageId, { read: true }));
      // updateMessage(messageId, { read: true }).then(() => {
      //   this.props.store.dispatch({ type: 'Mark_As_Read', messageId });
      // });
    });
  };

  onSelectAllMessages = () => {
    this.props.store.dispatch({ type: 'SELECT_ALL' });
  };

  onDeleteSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      console.log(this.state.selectedMessageIds);
      this.props.store.dispatch(deleteMessageThunk(messageId, { read: true }));
    });
  };

  onDeselectAllMessages = () => {
    this.props.store.dispatch({ type: 'DESELECT_ALL' });
  };

  onApplyLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(messageId => {
      const previousMessage = this.state.messages.find(
        message => messageId === message.id
      );
      this.props.store.dispatch(
        updateMessageThunk(messageId, {
          labels: previousMessage.labels + ',' + label
        })
      );
    });
  };

  onRemoveLabelSelectedMessages = labelToRemove => {
    this.state.selectedMessageIds.forEach(messageId => {
      let messagetoUpdate = this.state.messages.find(
        message => message.id === messageId
      );
      let newLabels = messagetoUpdate.labels.filter(
        label => label !== labelToRemove
      );
      this.props.store.dispatch(
        updateMessageThunk(messageId, { labels: newLabels.join(',') })
      );
    });
  };

  onOpenComposeForm = () => {
    if (this.state.showComposeForm) {
      this.props.store.dispatch({ type: 'CLOSE_COMPOSE_FORM' });
    } else {
      this.props.store.dispatch({ type: 'Open_Compose_Form' });
    }
  };

  onCancel = () => {
    this.props.store.dispatch({ type: 'CLOSE_COMPOSE_FORM' });
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
    this.props.store.dispatch(getMessagesThunk());
  }
}

export default App;
