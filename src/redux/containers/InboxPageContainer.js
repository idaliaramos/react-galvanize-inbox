import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import InboxPage from '../../components/InboxPage';

import getMessagesThunk from '../thunks/getMessagesThunk';
import createMessageThunk from '../thunks/createMessageThunk';
import deleteMessageThunk from '../thunks/deleteMessageThunk';
import updateMessageThunk from '../thunks/updateMessageThunk';

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages,
    selectedMessageIds: state.selectedMessageIds,
    showComposeForm: state.showComposeForm
    // message: state.message
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(getMessagesThunk()),

    onSelectMessage: messageId =>
      dispatch({ type: 'SELECT_MESSAGE', messageId }),

    onSubmit: message => {
      dispatch(createMessageThunk(message));
      dispatch({ type: 'CLOSE_COMPOSE_FORM' });
    },
    onDeselectMessage: messageId => {
      dispatch({ type: 'DESELECT_MESSAGE' });
    },
    onStarMessage: messageId => {
      dispatch(updateMessageThunk(messageId, { starred: true }));
    },
    onUnstarMessage: messageId => {
      dispatch(updateMessageThunk(messageId, { starred: false }));
    },
    onMarkAsReadMessage: messageId => {
      dispatch(updateMessageThunk(messageId, { read: true }));
    },

    onMarkAsUnreadSelectedMessages: messageId => {
      dispatch(updateMessageThunk(messageId, { read: false }));
    },
    onMarkAsReadSelectedMessages: messageId => {
      dispatch(updateMessageThunk(messageId, { read: true }));
    },
    onSelectAllMessages: () => {
      dispatch({ type: 'SELECT_ALL' });
    },
    onDeleteSelectedMessages: messageId => {
      dispatch(deleteMessageThunk(messageId, { read: true }));
    },
    onDeselectAllMessages: () => {
      dispatch({ type: 'DESELECT_ALL' });
    },

    onApplyLabelSelectedMessages: (messageId, changes) => {
      dispatch(updateMessageThunk(messageId, changes));
    },

    onRemoveLabelSelectedMessages: (messageId, changes) => {
      dispatch(updateMessageThunk(messageId, changes));
    },
    onOpenComposeForm: () => {
      // if (this.state.showComposeForm) {
      //   this.props.store.dispatch({ type: 'CLOSE_COMPOSE_FORM' });
      // } else {
      dispatch({ type: 'OPEN_COMPOSE_FORM' });
      // }
    },

    onCancel: () => {
      dispatch({ type: 'CLOSE_COMPOSE_FORM' });
    }

    //not dispaching to do anything?
    // unreadMessage: () => {
    //   this.state.messages.map(
    //     message =>
    //       !message.read
    //         ? this.state.unreadMessages.push(message)
    //         : this.state.readMessages.push(message)
    //   );
    // }
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
  componentDidMount() {
    this.props.onMount();
  }
});

export default compose(connectToStore, onDidMount)(InboxPage);
