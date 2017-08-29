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
  onUnstarMessage
}) {
  console.log(messages);
  return (
    <div className="MessagesComponent">
      {messages.map(message =>
        <MessageComponent
          message={message}
          messages={messages}
          selectedMessageIds={selectedMessageIds}
          onMarkAsReadMessage={onMarkAsReadMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
        />
      )}
    </div>
  );
}
