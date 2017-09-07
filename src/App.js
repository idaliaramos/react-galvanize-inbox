import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
import GetMessages from './api/GetMessages';
// import postStarred from './api/postStarred';
import deleteMessage from './api/deleteMessage';
import updateMessage from './api/updateMessage';
import createMessage from './api/createMessage';
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

  onSubmit = message => {
    let newMessage = {
      fields: {
        subject: message.subject,
        body: message.body,
        read: false,
        starred: false,
        labels: 'new'
      }
    };

    createMessage(message).then(newMessage => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.unshift(message);
        return {
          messages: newMessages,
          showComposeForm: false
        };
      });
    });
  };

  onCancel = () => {
    this.setState({ showComposeForm: false });
  };

  onSelectMessage = messageId => {
    this.state.selectedMessageIds.push(messageId);
    this.setState({ selected: true });
  };

  onDeselectMessage = messageId => {
    this.state.selectedMessageIds.splice(
      this.state.selectedMessageIds.indexOf(messageId),
      1
    );
    this.setState({ selected: false });
  };

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

  onSelectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds = this.state.messages.map(message => message.id);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

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

  onDeselectAllMessages = () => {
    this.setState({ selectedMessageIds: [] });
  };

  onCancel = () => {
    this.setState({ showComposeForm: false });
  };

  onApplyLabelSelectedMessages = label => {
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
    //this is looking at each message and updating the list of labels to only
    //have the labels we want
    matchingMessages.forEach(message => {
      let updatedLabels = message.labels.filter(
        label => label !== labelToRemove
      );
      //send api update request
      updateMessage(message.id, {
        labels: updatedLabels.join()
      }).then(
        //on success update data on client side and rerender
        function(messageData) {
          //todo: what if there is no matching message,
          let message = this.state.messages.find(
            message => message.id === messageData.id
          );
          message.labels = messageData.labels;
          //ask nestor about messages being set to itself
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
    });
  }
}

export default App;
