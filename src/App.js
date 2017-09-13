import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
import GetMessages from './api/GetMessages';
// import postStarred from './api/postStarred';
import deleteMessage from './api/deleteMessage';
import updateMessage from './api/updateMessage';
import createMessage from './api/createMessage';
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
    createMessage(message).then(newMessage =>
      this.props.store.dispatch({
        type: 'Add_New_Message',
        subject: newMessage.subject,
        body: newMessage.body
      })
    );

    // createMessage(message).then(newMessage => {
    //   this.setState(prevState => {
    //     let newMessages = prevState.messages.slice(0);
    //     newMessages.unshift(message);
    //     return {
    //       messages: newMessages,
    //       showComposeForm: false
    //     };
    //   });
    // });
  };

  onCancel = () => {
    this.setState({ showComposeForm: false });
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
    updateMessage(messageId, { starred: true }).then(res => {
      this.props.store.dispatch({ type: 'Mark_As_Starred', messageId });
    });
  };

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
      this.props.store.dispatch({ type: 'Mark_As_Read', messageId });
    });
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
        this.setState(prevState => {
          if (prevState.selectedMessageIds.length > 0) {
            let newSetofMessages = prevState.messages.splice(0);
            let toChange = newSetofMessages.filter(message =>
              prevState.selectedMessageIds.includes(message.id)
            );
            toChange.forEach(message => (message.read = true));
            return {
              messages: newSetofMessages,
              selectedMessageIds: []
            };
          }
        });
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
    this.state.selectedMessageIds.forEach(
      messageId =>
        deleteMessage(messageId).then(() =>
          this.props.store.dispatch({ type: 'Remove_Message', messageId })
        )
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
    matchingMessages.filter(message => !message.labels.includes(label));
    matchingMessages.forEach(message =>
      updateMessage(message.id, {
        labels: message.labels + ',' + label
      }).then(() =>
        GetMessages().then(filteredResults => {
          this.setState(prevState => {
            return {
              messages: filteredResults,
              selectedMessageIds: []
            };
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
          this.setState({
            messages: this.state.messages,
            selectedMessageIds: []
          });
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
    GetMessages().then(messages => {
      this.props.store.dispatch({ type: 'Get_Messages', messages });
    });
  }
  //   .then(filteredResults => {
  //     this.setState(prevState => {
  //       return { messages: filteredResults };
  //     });
  //   });
  // }
}

export default App;
