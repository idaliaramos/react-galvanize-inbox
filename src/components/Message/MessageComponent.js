import React from 'react';
var classNames = require('classnames');

export default function MessageComponent({ message }) {
  // let whatever = classNames({
  //   row: true,
  //   message: true,
  //   unread: !props.message.read,
  //   read: props.message.read
  // });

  // let readornot = message.read ? 'read' : 'unread';

  return (
    <div className={'row message unread starred'}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o" />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="#">Here is some message text that has a bunch of stuff</a>
      </div>
    </div>
  );
}
