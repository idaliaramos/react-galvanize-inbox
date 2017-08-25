import React from 'react';
var classNames = require('classnames');

export default function MessageComponent({ message, selected }) {
  let messageClassNames = classNames({
    row: true,
    message: true,
    unread: !message.read,
    read: message.read
  });
  let selectedClassNames = classNames({
    selected: selected
  });

  // let messageClassNames = 'row message';
  // if (message.read) {
  //   messageClassNames = messageClassNames + ' read';
  // } else {
  //   messageClassNames = messageClassNames + ' unread';
  // }

  function renderLabels(labels) {
    return labels.map(label => {
      return (
        <span className="label label-warning">
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
            <input type="checkbox" checked={selected ? 'checked' : null} />
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${message.starred ? '' : '-o'}`} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {renderLabels(message.labels)}
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  );
}
