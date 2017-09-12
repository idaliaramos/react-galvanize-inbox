import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export default function setupStore() {
  return createStore(rootReducer);
}
