import React from 'react';
// import MessageComponent from '../Message/MessageComponent';
var classNames = require('classnames');

export default function ToolbarComponent({ messages, selectedMessageCount }) {
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
  //  let disable = selectedMessageCount===0 ? "disabled" : ""
  function selectAll(event) {
    event.preventDefault();
    console.log('delekjdfkdjaf');
    //add event that on click of the checkbox button  all messages will be selected
  }
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{messages.length}</span>
          unread messages
        </p>

        <p />

        <button className="btn btn-default" disabled={disable()}>
          <i className={isSelectedClassNames} />
        </button>

        <button className="btn btn-default">Mark As Read</button>

        <button className="btn btn-default">Mark As Unread</button>

        <select className="form-control label-select" disabled={disable()}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={disable()}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={disable()}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}
