import React from 'react';
import MessageComponent from '../Message/MessageComponent';

export default function MessagesComponent({
  messages,
  onSelectMessage,
  onSubjectClicked,
  selectedMessageIds,
  onDeselectMessage,
  onMarkAsReadMessage,
  onStarMessage,
  onUnstarMessage,
  selected,
  onDeselectAllMessages,
  onMarkAsUnreadSelectedMessages,
  onDeleteSelectedMessages
}) {
  // console.log('on Select message >>>>>>>>', onSelectMessage);
  // console.log('selectedMessageIds', selectedMessageIds);
  return (
    <div className="MessagesComponent">
      {messages.map(message =>
        <MessageComponent
          message={message}
          selected={selectedMessageIds.includes(message.id)}
          key={message.id}
          selectedMessageIds={selectedMessageIds}
          onMarkAsReadMessage={onMarkAsReadMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
          onDeselectAllMessages={onDeselectAllMessages}
          onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
          onDeleteSelectedMessages={onDeleteSelectedMessages}
        />
      )}
    </div>
  );
}
