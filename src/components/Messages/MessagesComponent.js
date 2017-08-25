import React from 'react';
import MessageComponent from '../Message/MessageComponent';

export default function MessagesComponent({ messages }) {
  return (
    <div className="MessagesComponent">
      {messages.map(message =>
        <MessageComponent message={message} selected={message.id} />
      )}
    </div>
  );
}
