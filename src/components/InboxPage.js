import React from 'react';
import InboxPageLayout from '../components/InboxPageLayout/InboxPageLayout';
import ToolbarComponent from '../components/Toolbar/ToolbarComponent';
import MessagesComponent from '../components/Messages/MessagesComponent';
import ComposeFormComponent from '../components/ComposeForm/ComposeFormComponent';

export default function InboxPage({
  messages,
  selectedMessageIds,
  showComposeForm,
  onMarkAsReadMessage,
  onSelectMessage
}) {
  return (
    <div className="InboxPage">
      <InboxPageLayout>
        <ToolbarComponent
          messages={messages}
          selectedMessageCount={selectedMessageIds && selectedMessageIds.length}
        />
        <MessagesComponent
          messages={messages}
          onSelectMessage={onSelectMessage}
          onMarkAsReadMessage={onMarkAsReadMessage}
          key="messagecomponent"
        />
        {showComposeForm && <ComposeFormComponent />}
      </InboxPageLayout>
    </div>
  );
}
