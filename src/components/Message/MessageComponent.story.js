import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageComponent from './MessageComponent';
// import ReadUnstarredMessageComponent from './ReadUnstarredMessageComponent';

// let message = {
//   id: 1,
//   subject:
//     "You can't input the protocol without calculating the mobile RSS protocol!",
//   read: false,
//   starred: true,
//   labels: ['dev', 'personal'],
//   selected: false
// };

storiesOf('MessageComponent', module)
  .add('Unread Unstarred', () =>
    <MessageComponent
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: false,
        labels: ['dev', 'personal'],
        selected: false
      }}
    />
  )
  .add('Read UNStarred', () =>
    <MessageComponent
      message={{
        id: 2,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: true,
        starred: false,
        labels: ['dev', 'personal'],
        selected: false
      }}
    />
  )
  .add('Selected', () =>
    <MessageComponent
      message={{
        id: 3,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: false,
        labels: ['dev', 'personal'],
        selected: true
      }}
    />
  )
  .add('Starred', () =>
    <MessageComponent
      message={{
        id: 4,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal'],
        selected: false
      }}
    />
  )
  .add('With Labels', () =>
    <MessageComponent
      message={{
        id: 5,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal'],
        selected: false
      }}
    />
  );
