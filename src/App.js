import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
import GetMessages from './api/GetMessages';
// import postStarred from './api/postStarred';
import deleteMessage from './api/deleteMessage';
import updateMessage from './api/updateMessage';
// import './App.css';

class App extends Component {
  state = {
    messages: [],
    selected: false,
    selectedMessageIds: [],
    showComposeForm: null,
    unreadMessages: []
  };

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
  onSelectMessage = messageId => {
    this.state.selectedMessageIds.push(messageId);
    this.setState({ selected: true });
  };

  onDeselectMessage = messageId => {
    this.state.selectedMessageIds.splice(
      this.state.selectedMessageIds.indexOf(messageId),
      1
    );
  };

  // function onStarMessage(messageId) {
  //   messages.filter(message => message.id === messageId)[0].starred = true;
  // }
  //

  onStarMessage = messageId => {
    updateMessage(messageId, { starred: true }).then(res => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.find(
          starredMessage => starredMessage.id === res.id
        ).starred = true;
        return {
          messages: newMessages
        };
      });
    });
  };

  // function onUnstarMessage(messageId) {
  //   messages.filter(message => message.id === messageId)[0].starred = false;
  // }

  onUnstarMessage = messageId => {
    updateMessage(messageId, { starred: false }).then(res => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.find(
          unstarredMessage => unstarredMessage.id === res.id
        ).starred = false;
        return {
          messages: newMessages
        };
      });
    });
  };

  onMarkAsReadMessage = messageId => {
    updateMessage(messageId, { read: true }).then(() => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.find(
          readMessage => readMessage.id === messageId
        ).read = true;
        return {
          messages: newMessages
        };
      });
    });
  };

  onMarkAsUnreadSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId =>
      updateMessage(messageId, { read: false }).then(() =>
        this.setState(prevState => {
          let newSetofMessages = prevState.messages.splice(0);
          let toChange = newSetofMessages.filter(message =>
            prevState.selectedMessageIds.includes(message.id)
          );
          toChange.forEach(message => (message.read = false));
          return {
            messages: newSetofMessages
          };
        })
      )
    );
  };
  // console.log(this.state.selectedMessageIds);
  // for (let id of this.state.selectedMessageIds) {
  //   updateUnreadMessages(id);

  // onMarkAsUnreadSelectedMessages = messageId => {
  //   updateUnreadMessages(messageId).then();

  // console.log('got to onMarkAsUnreadSelectedMessage');
  // for (let x = 0; x < this.state.selectedMessagesIds.length; x++) {
  //   for (let y = 0; y < this.state.messages.length; y++) {
  //     if (this.state.messages[y].id === this.state.selectedMessagesIds[x]) {
  //       this.state.messages[y].read = false;
  //       this.state.unreadMessages.push(this.state.messages.id);
  //       console.log(this.state.unreadMessages);
  //     }
  //   }
  // }
  // };

  onSelectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds = this.state.messages.map(message => message.id);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  // onDeleteSelectedMessages = () => {
  //   this.setState(prevState => {
  //     let newOnDeleteSelectedMessages = prevState.selectedMessageIds.slice(0);
  //     newOnDeleteSelectedMessages = this.state.messages.filter(
  //       item => !this.state.selectedMessageIds.includes(item.id)
  //     );
  //     return {
  //       onDeleteSelectedMessages: newOnDeleteSelectedMessages
  //     };
  //   });
  // };

  onDeleteSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId =>
      deleteMessage(messageId).then(() =>
        this.setState(prevState => {
          let newMessages = prevState.messages.splice(0);
          let updatedMessages = newMessages.filter(
            message => !prevState.selectedMessageIds.includes(message.id)
          );
          return {
            messages: updatedMessages
          };
        })
      )
    );
  };

  //   for (let id of this.state.selectedMessageIds) {
  //     deleteMessage(id);
  //   }
  // };

  // onDeleteSelectedMessages = () => {
  //   this.state.messages = this.state.messages.filter(
  //     item => !this.state.selectedMessageIds.includes(item.id)
  //   );
  // };

  onDeselectAllMessages = () => {
    this.setState({ selectedMessageIds: [] });
  };

  onSubmit = ({ subject, body }) => {
    if (subject && body) {
    }
    this.setState({ showComposeForm: false });
  };

  onCancel = () => {
    this.setState({ showComposeForm: false });
  };

  onApplyLabelSelectedMessages = label => {
    // let newSetofMessages = this.state.messages.splice(0);
    let matchingMessages = this.state.messages.filter(message =>
      this.state.selectedMessageIds.includes(message.id)
    );
    let needLabelsArr = matchingMessages.filter(
      message => !message.labels.includes(label)
    );
    needLabelsArr.forEach(message =>
      updateMessage(message.id, {
        labels: message.labels + ',' + label
      }).then(() =>
        GetMessages().then(filteredResults => {
          this.setState(prevState => {
            return { messages: filteredResults };
          });
        })
      )
    );
  };

  onRemoveLabelSelectedMessages = labelToRemove => {
    let matchingMessages = this.state.messages.filter(
      message =>
        this.state.selectedMessageIds.includes(message.id) &&
        message.labels.includes(labelToRemove)
    );
    matchingMessages.forEach(message => {
      let updatedLabels = message.labels.filter(
        label => label !== labelToRemove
      );
      updateMessage(message.id, {
        labels: updatedLabels.join()
      }).then(
        function(messageData) {
          let message = this.state.messages.find(
            message => message.id === messageData.id
          );
          message.labels = messageData.labels;
          this.setState({ messages: this.state.messages });
        }.bind(this)
      );
    });
  };

  onOpenComposeForm = () => {
    if (this.state.showComposeForm) {
      this.setState(prevState => {
        let newComposeForm = false;
        return {
          showComposeForm: newComposeForm
        };
      });
    } else {
      this.setState(prevState => {
        let newComposeForm = true;
        return {
          showComposeForm: newComposeForm
        };
      });
    }
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
    GetMessages().then(filteredResults => {
      this.setState(prevState => {
        return { messages: filteredResults };
      });
      // this.setState({ messages: filteredResults });
    });
  }
}

export default App;
