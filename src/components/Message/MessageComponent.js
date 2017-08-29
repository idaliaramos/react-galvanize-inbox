import React from 'react';
var classNames = require('classnames');

export default function MessageComponent({
  messages,
  message,
  selected,
  onSelectMessage,
  onMarkAsReadMessage,
  onDeselectMessage
}) {
  function handleCheckClick(e) {
    e.preventDefault();
    if (!message.selected) {
      onSelectMessage(message);
    } else {
      console.log('hey');
      // onDeselectMessage(message);
    }
  }
  function handleSubjectClick(e) {
    e.preventDefault();
    //put new callback function here
    onMarkAsReadMessage(message);
  }
  console.log('Messqt', messages);
  let messageClassNames = classNames({
    row: true,
    message: true,
    unread: !message.read,
    read: message.read
  });
  let selectedClassNames = classNames({
    selected: selected
  });

  function renderLabels(labels) {
    return labels.map(label => {
      return (
        <span className="label label-warning" key="renderl">
          {label}
        </span>
      );
    });
  }

  return (
    <div className={(messageClassNames, selectedClassNames)}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected ? 'checked' : null}
              onClick={handleCheckClick}
            />
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${message.starred ? '' : '-o'}`} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {renderLabels(message.labels)}
        <a href="a">
          onClick={handleSubjectClick}
          {message.subject}
        </a>
      </div>
    </div>
  );
}
