import React from 'react';
// import MessageComponent from '../Message/MessageComponent';
var classNames = require('classnames');

export default function ToolbarComponent({
  messages,
  selectedMessageIds,
  selectedMessageCount,
  onOpenComposeForm,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages,
  onMarkAsReadMessage
}) {
  let isSelectedClassNames = classNames({
    fa: true,
    'fa-check-square-o': selectedMessageCount === messages.length,
    'fa-minus-square-o':
      selectedMessageCount > 0 && selectedMessageCount < messages.length,
    'fa-square-o': selectedMessageCount === 0
  });
  function disable() {
    if (selectedMessageCount === 0) {
      return 'disabled';
    } else {
      return null;
    }
  }
  let unreadMessages = [];
  let readMessages = [];

  function handleSelectallClick(event) {
    // event.preventDefault;
    if (selectedMessageCount < messages.length) {
      onSelectAllMessages();
    } else {
      onDeselectAllMessages();
    }
  }

  function handleMarkAsUnread() {
    console.log('inthe unread');
    // event.preventDefault;
    selectedMessageIds.forEach(messageId => {
      onMarkAsUnreadSelectedMessages(messageId);
    });
  }
  //this is the one when we click and it marks as read
  function handleMarkSelectedAsRead() {
    // event.preventDefault;
    console.log('int the mark as read section');
    selectedMessageIds.forEach(messageId => {
      onMarkAsReadSelectedMessages(messageId);
    });
  }

  function handleDeleteMessages() {
    selectedMessageIds.forEach(messageId =>
      onDeleteSelectedMessages(messageId)
    );
  }

  function handleLabelClick(event) {
    // event.preventDefault();
    let label = event.target.value;
    let changes = {};
    selectedMessageIds.forEach(messageId => {
      const previousMessage = messages.find(
        message => messageId === message.id
      );
      changes.labels = previousMessage.labels;
      changes.labels.push(label);
      // let changes = previousMessage.labels + ',' + label;

      onApplyLabelSelectedMessages(messageId, {
        labels: changes.labels.join(',')
      });
    });
  }

  function handleRemoveLabel(event) {
    let labelToRemove = event.target.value;
    // let changes = {};
    selectedMessageIds.forEach(messageId => {
      let messagetoUpdate = messages.find(message => message.id === messageId);
      let newLabels = messagetoUpdate.labels.filter(
        label => label !== labelToRemove
      );

      onRemoveLabelSelectedMessages(messageId, { labels: newLabels.join(',') });
    });
  }
  function handleComposeForm() {
    onOpenComposeForm();
  }
  function unreadMessage() {
    messages.map(
      message =>
        !message.read
          ? unreadMessages.push(message)
          : readMessages.push(message)
    );
    return unreadMessages.length;
  }
  let count = unreadMessage();
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{count}</span>
          unread messages
        </p>

        <p />

        <button className="btn btn-danger" onClick={handleComposeForm}>
          <i className="fa fa-plus" />
        </button>

        <button
          className="btn btn-default"
          // disabled={disable()}
          onClick={handleSelectallClick}>
          <i className={isSelectedClassNames} onClick={handleSelectallClick} />
        </button>

        <button
          className="btn btn-default"
          disabled={disable()}
          onClick={handleMarkSelectedAsRead}>
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled={disable()}
          onClick={handleMarkAsUnread}>
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          disabled={disable()}
          onChange={handleLabelClick}>
          <option value="">Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          disabled={disable()}
          onChange={handleRemoveLabel}>
          <option value="">Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          disabled={disable()}
          onClick={handleDeleteMessages}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}
