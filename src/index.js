import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// import ComposeFormComponent from './components/ComposeForm/ComposeFormComponent';
// import MessagesComponent from './components/Messages/MessagesComponent';
// import ToolbarComponent from './components/Toolbar/ToolbarComponent';
// import InboxPageLayout from './components/InboxPageLayout/InboxPageLayout';
import InboxPage from './components/InboxPage';

let messages = [
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
    read: true,
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

let selectedMessageIds = [1, 3, 5];

let showComposeForm = true;

function onSelectMessage(message) {
  selectedMessageIds.push(message.id);
  render();
}

function onMarkAsReadMessage(message) {
  console.log('is subject clicked', message);
  message.read = false;
  render();
}
function onDeselectMessage(message) {
  console.log('deselectedmeow');
}
console.log('this is D', onDeselectMessage());

function render() {
  ReactDOM.render(
    <InboxPage
      messages={messages}
      selectedMessageIds={selectedMessageIds}
      showComposeForm={showComposeForm}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
      // onMarkAsReadMessage={onMarkAsReadMessage}
    />,
    document.getElementById('root')
  );
}
render();
