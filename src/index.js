import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// import ComposeFormComponent from './components/ComposeForm/ComposeFormComponent';
// import MessagesComponent from './components/Messages/MessagesComponent';
// import ToolbarComponent from './components/Toolbar/ToolbarComponent';
// import InboxPageLayout from './components/InboxPageLayout/InboxPageLayout';
import InboxPage from './components/InboxPage';

var messages = [
  {
    id: 1,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    read: false,
    starred: true,
    labels: ['dev', 'personal']
  },
  {
    id: 2,
    subject:
      "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 3,
    subject:
      'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev']
  },
  {
    id: 4,
    subject: 'We need to program the primary TCP hard drive!',
    read: false,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 5,
    subject:
      'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
    read: false,
    starred: false,
    labels: ['personal']
  },
  {
    id: 6,
    subject: 'We need to back up the wireless GB driver!',
    read: true,
    starred: true,
    labels: []
  },
  {
    id: 7,
    subject: 'We need to index the mobile PCI bus!',
    read: true,
    starred: false,
    labels: ['dev', 'personal']
  },
  {
    id: 8,
    subject:
      'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
    read: true,
    starred: true,
    labels: []
  }
];
let selected = false;
let selectedMessageIds = [];

let showComposeForm = null;

let unreadMessages = [];
let readMessages = [];

function onSelectMessage(messageId) {
  selectedMessageIds.push(messageId);
  render();
}

function onDeselectMessage(messageId) {
  console.log('deselected');
  selectedMessageIds.splice(selectedMessageIds.indexOf(messageId), 1);
  render();
}
function onStarMessage(messageId) {
  messages.filter(message => message.id === messageId)[0].starred = true;
  render();
}
function onUnstarMessage(messageId) {
  messages.filter(message => message.id === messageId)[0].starred = false;
  render();
}
function onMarkAsReadMessage(messageId) {
  console.log('got to the read message');

  let foo = messages.find(message => message.id === messageId);
  console.log('foo', foo);
  if (foo) {
    foo.read = true;
  }

  render();
}
function onSelectAllMessages() {
  selectedMessageIds = messages.map(message => message.id);
  render();
}
function onDeselectAllMessages() {
  selectedMessageIds = [];
  render();
}
function onMarkAsUnreadSelectedMessages() {
  console.log('got to onMarkAsUnreadSelectedMessage');
  for (let x = 0; x < selectedMessageIds.length; x++) {
    for (let y = 0; y < messages.length; y++) {
      if (messages[y].id === selectedMessageIds[x]) {
        console.log('MY', messages[y]);
        messages[y].read = false;
        unreadMessages.push(messages.id);
        console.log(unreadMessages);
      }
    }
  }
  render();
}
function onDeleteSelectedMessages() {
  messages = messages.filter(item => !selectedMessageIds.includes(item.id));

  render();
}
function onSubmit({ subject, body }) {
  if (subject && body) {
    console.log('form submitted');
    // showComposeForm = false;
  }
}

function onCancel() {
  console.log('im in the cancel');
  showComposeForm = false;
  console.log(showComposeForm);
  render();
}

function onApplyLabelSelectedMessages(label) {
  selectedMessageIds.forEach(messageId => {
    const message = messages.find(function(message) {
      return message.id === messageId;
    });
    message.labels.push(label);
  });
  render();
}

function onRemoveLabelSelectedMessages(label) {
  selectedMessageIds.forEach(messageId => {
    const message = messages.find(function(message) {
      return message.id === messageId;
    });
    message.labels.splice(message.labels.indexOf(label), 1);
  });
  render();
}
function onOpenComposeForm() {
  showComposeForm = true;
  render();
}
// function unreadMessage() {
//   messages.map(
//     message =>
//       !message.read ? unreadMessages.push(message) : readMessages.push(message)
//   );
// }

function render() {
  ReactDOM.render(
    <InboxPage
      selected={selected}
      messages={messages}
      selectedMessageIds={selectedMessageIds}
      showComposeForm={showComposeForm}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
      onUnstarMessage={onUnstarMessage}
      onStarMessage={onStarMessage}
      onSelectAllMessages={onSelectAllMessages}
      onDeselectAllMessages={onDeselectAllMessages}
      onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onDeleteSelectedMessages={onDeleteSelectedMessages}
      onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
      onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
      onOpenComposeForm={onOpenComposeForm}
      unreadMessage={messages.map(
        message =>
          !message.read
            ? unreadMessages.push(message)
            : readMessages.push(message)
      )}
    />,
    document.getElementById('root')
  );
}
render();
