import React from 'react';
var classNames = require('classnames');

export default class MessageComponent extends React.Component {
  static defaultProps = {
    onSelectMessage: () => {},
    onDeselectMessage: () => {},
    onMarkAsReadMessage: () => {},
    onMarkAsUnreadSelectedMessages: () => {},
    onStarMessage: () => {},
    onUnstarMessage: () => {},
    updateUnreadMessages: () => {}
  };

  _handleCheckClick = event => {
    // const onSubmit = this.props.onSubmit || (() => {}); // See defaultProps above
    const { onSelectMessage } = this.props;
    const { onDeselectMessage } = this.props;
    if (!this.props.selected) {
      onSelectMessage(this.props.message.id);
    } else {
      onDeselectMessage(this.props.message.id);
    }
  };

  _handleReadClick = event => {
    event.preventDefault();
    // const onSubmit = this.props.onSubmit || (() => {}); // See defaultProps above
    const { onMarkAsReadMessage } = this.props;
    if (!this.props.message.read) {
      onMarkAsReadMessage(this.props.message.id);
    }
  };

  _handleStarClick = event => {
    const { onStarMessage } = this.props;
    const { onUnstarMessage } = this.props;
    //
    event.preventDefault();
    if (!this.props.message.starred) {
      onStarMessage(this.props.message.id);
    } else {
      onUnstarMessage(this.props.message.id);
    }
  };

  renderLabels = labels => {
    //
    return labels.map(label => {
      return (
        <span className="label label-warning">
          {label}
        </span>
      );
    });
  };

  updateLabels = updatedLabels => {
    this.setState({
      labels: updatedLabels
    });
  };

  render() {
    // const { message } = this.props
    const message = this.props.message;
    //
    let messageClassNames = classNames({
      row: true,
      message: true,
      unread: !message.read,
      read: message.read,
      selected: message.selected
    });

    return (
      <div className={messageClassNames}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                // checked={this.state.selected ? 'checked' : null}
                checked={this.props.selected === true}
                // defaultChecked={this.state.selected === true}
                onClick={this._handleCheckClick}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={`star fa fa-star${message.starred ? '' : '-o'}`}
                onClick={this._handleStarClick}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={this._handleReadClick}>
          {message.labels && this.renderLabels(message.labels)}
          <a href="a">
            {message.subject}
          </a>
        </div>
      </div>
    );
  }
}
