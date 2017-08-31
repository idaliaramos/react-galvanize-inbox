import React from 'react';

export default function ComposeFormComponent({ onCancel, onSubmit }) {
  function handleClickCancel() {
    // event.preventDefault();
    console.log('cancel');
    onCancel();
  }
  function handleOnSubmit(event) {
    event.preventDefault();
    console.log('submited');
    // onSubmit({subject, body});
  }

  return (
    <form className="form-horizontal well" onSubmit={handleOnSubmit}>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <div htmlFor="subject" className="col-sm-2 control-label">
          Subject
        </div>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter a subject"
            name="subject"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">
          Body
        </label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control" />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary" />
          <input
            type="reset"
            value="Cancel"
            className="btn btn-default"
            onClick={handleClickCancel}
          />
        </div>
      </div>
    </form>
  );
}
