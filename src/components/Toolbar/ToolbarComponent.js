import React from 'react';
// import MessageComponent from '../Message/MessageComponent';
var classNames = require('classnames');

export default function ToolbarComponent({
  messages,
  selectedMessageCount,
  onOpenComposeForm,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages
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
    // event.preventDefault;
    onMarkAsUnreadSelectedMessages();
  }
  function handleDeleteMessages() {
    onDeleteSelectedMessages();
  }

  function handleLabelClick(event) {
    // event.preventDefault();
    let label = event.target.value;

    onApplyLabelSelectedMessages(label);
  }

  function handleRemoveLabel(event) {
    let label = event.target.value;
    onRemoveLabelSelectedMessages(label);
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

        {/* <button className="btn btn-default">Mark As Read</button> */}

        <button className="btn btn-default" onClick={handleMarkAsUnread}>
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          disabled={disable()}
          onChange={handleLabelClick}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          disabled={disable()}
          onChange={handleRemoveLabel}>
          <option>Remove label</option>
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
