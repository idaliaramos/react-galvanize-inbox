import { configure } from '@storybook/react';
require('../src/index.css');
function loadStories() {
  require('../src/components/Message/MessageComponent.story');
  require('../src/components/Messages/MessagesComponent.story');
  require('../src/components/Toolbar/ToolBarComponent.story');
  require('../src/components/ComposeForm/ComposeFormComponent.story');
  require('../src/components/InboxPageLayout/InboxPageLayout.story');
  require('../src/components/InboxPage.story');
}
configure(loadStories, module);
