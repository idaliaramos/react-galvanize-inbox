import { configure } from '@storybook/react';
require('../src/index.css');
function loadStories() {
  require('../src/components/Message/MessageComponent.story.js');
  require('../src/components/Message/MessageComponent.js');
  // require('../src/components/Message/ReadUnstarredMessageComponent.story.js');
  // require('../src/components/Message/ReadUnstarredMessageComponent.js');
}
configure(loadStories, module);
