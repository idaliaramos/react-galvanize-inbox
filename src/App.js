import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    selected: false,
    selectedMessageIds: [],
    showComposeForm: null,
    unreadMessages: [],
    readMessages: []
  };

  render() {
    return (
      <InboxPage
        selected={this.state.selected}
        messages={this.messages}
        selectedMessageIds={this.state.selectedMessageIds}
        showComposeForm={this.state.showComposeForm}
        onSelectMessage={this.onSelectMessage}
        onDeselectMessage={this.onDeselectMessage}
        onMarkAsReadMessage={this.onMarkAsReadMessage}
        onUnstarMessage={this.onUnstarMessage}
        onStarMessage={this.onStarMessage}
        onSelectAllMessages={this.onSelectAllMessages}
        onDeselectAllMessages={this.onDeselectAllMessages}
        onMarkAsUnreadSelectedMessages={this.onMarkAsUnreadSelectedMessages}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onDeleteSelectedMessages={this.onDeleteSelectedMessages}
        onApplyLabelSelectedMessages={this.onApplyLabelSelectedMessages}
        onRemoveLabelSelectedMessages={this.onRemoveLabelSelectedMessages}
        onOpenComposeForm={this.onOpenComposeForm}
        unreadMessage={this.messages.map(
          message =>
            !message.read
              ? this.state.unreadMessages.push(message)
              : this.state.readMessages.push(message)
        )}
      />
    );
  }
  onSelectMessage = messageId => {
    this.state.selectedMessagesIds.push(messageId);
  };

  onDeselectMessage = messageId => {
    this.state.selectedMessagesIds.splice(
      this.state.selectedMessagesIds.indexOf(messageId),
      1
    );
  };

  // function onStarMessage(messageId) {
  //   messages.filter(message => message.id === messageId)[0].starred = true;
  // }

  onStarMessage = messageId => {
    this.messages.filter(message => message.id === messageId)[0].starred = true;
  };

  // function onUnstarMessage(messageId) {
  //   messages.filter(message => message.id === messageId)[0].starred = false;
  // }

  onUnstarMessage = messageId => {
    this.messages.filter(
      message => message.id === messageId
    )[0].starred = false;
  };

  onMarkAsReadMessage = messageId => {
    console.log('got to the read message');

    let foo = this.messages.find(message => message.id === messageId);

    if (foo) {
      foo.read = true;
    }
  };
  onSelectAllMessages = () => {
    this.state.selectedMessagesIds = this.messages.map(message => message.id);
  };
  onDeselectAllMessages = () => {
    this.state.selectedMessagesIds = [];
  };
  onMarkAsUnreadSelectedMessages = () => {
    console.log('got to onMarkAsUnreadSelectedMessage');
    for (let x = 0; x < this.state.selectedMessagesIds.length; x++) {
      for (let y = 0; y < this.messages.length; y++) {
        if (this.messages[y].id === this.state.selectedMessagesIds[x]) {
          this.messages[y].read = false;
          this.state.unreadMessages.push(this.messages.id);
          console.log(this.state.unreadMessages);
        }
      }
    }
  };
  onDeleteSelectedMessages = () => {
    this.messages = this.messages.filter(
      item => !this.state.selectedMessageIds.includes(item.id)
    );
  };
  onSubmit = ({ subject, body }) => {
    if (subject && body) {
      console.log('form submitted');
      // showComposeForm = false;
    }
  };

  onCancel = () => {
    console.log('im in the cancel');
    this.state.showComposeForm = false;
  };

  onApplyLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(messageId => {
      const message = this.messages.find(function(message) {
        return message.id === messageId;
      });
      message.labels.push(label);
    });
  };

  onRemoveLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(messageId => {
      const message = this.messages.find(function(message) {
        return message.id === messageId;
      });
      message.labels.splice(message.labels.indexOf(label), 1);
    });
  };
  onOpenComposeForm = () => {
    showComposeForm = true;
  };
  unreadMessage = () => {
    this.messages.map(
      message =>
        !message.read
          ? unreadMessages.push(message)
          : readMessages.push(message)
    );
  };
}

export default App;
