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
    console.log('about to delete');
    onDeleteSelectedMessages();
  }

  function handleLabelClick(event) {
    // event.preventDefault();
    let label = event.target.value;
    console.log(label);
    onApplyLabelSelectedMessages(label);
  }

  function handleRemoveLabel(event) {
    let label = event.target.value;
    onRemoveLabelSelectedMessages(label);
  }

  //  let disable = selectedMessageCount===0 ? "disabled" : ""

  //add event that on click of the checkbox button  all messages will be selected

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{messages.length}</span>
          unread messages
        </p>

        <p />

        <a className="btn btn-danger">
          <i className="fa fa-plus" onClick={disable} />
        </a>

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
