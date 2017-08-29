import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageComponent from './MessageComponent';
// import ReadUnstarredMessageComponent from './ReadUnstarredMessageComponent';

storiesOf('MessageComponent', module)
  .add('Unread Unstarred', () =>
    <MessageComponent
      key="messagecomponent"
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: false,
        labels: []
      }}
      selected={false}
    />
  )
  .add('Read UNStarred', () =>
    <MessageComponent
      key="messagecomponent"
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: true,
        starred: false,
        labels: []
      }}
      selected={false}
    />
  )
  .add('Selected', () =>
    <MessageComponent
      key="messagecomponent"
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: false,
        labels: []
      }}
      selected={true}
    />
  )
  .add('Starred', () =>
    <MessageComponent
      key="messagecomponent"
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: []
      }}
      selected={false}
    />
  )
  .add('With Labels', () =>
    <MessageComponent
      key="messagecomponent"
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal']
      }}
      selected={false}
    />
  );
