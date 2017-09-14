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
  onSelectMessage,
  onDeselectMessage,
  onStarMessage,
  onUnstarMessage,
  onOpenComposeForm,
  onApplyLabelSelectedMessages,
  onSelectAllMessages,
  onDeleteSelectedMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onRemoveLabelSelectedMessages,
  onSubmit,
  onCancel
}) {
  return (
    <div className="InboxPage">
      <InboxPageLayout>
        <ToolbarComponent
          messages={messages}
          selectedMessageCount={selectedMessageIds && selectedMessageIds.length}
          onOpenComposeForm={onOpenComposeForm}
          onSelectAllMessages={onSelectAllMessages}
          onDeselectAllMessages={onDeselectAllMessages}
          onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
          onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
          onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
          onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
          onDeleteSelectedMessages={onDeleteSelectedMessages}
          onMarkAsReadMessage={onMarkAsReadMessage}
          showComposeForm={showComposeForm}
        />
        <MessagesComponent
          key={'messagecomponent1'}
          messages={messages}
          onSelectMessage={onSelectMessage}
          onMarkAsReadMessage={onMarkAsReadMessage}
          onDeselectMessage={onDeselectMessage}
          selectedMessageIds={selectedMessageIds}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
          onDeselectAllMessages={onDeselectAllMessages}
          showComposeForm={showComposeForm}
        />

        {showComposeForm
          ? <ComposeFormComponent onSubmit={onSubmit} onCancel={onCancel} />
          : undefined}
      </InboxPageLayout>
    </div>
  );
}
