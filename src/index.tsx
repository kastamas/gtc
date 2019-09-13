import { createStore } from 'app/store';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app/App';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css';
import 'assets/sass/app.scss';

const MOUNT_NODE = document.getElementById('root');
const history = createBrowserHistory();
const initialState = (window as any).___INITIAL_STATE__;
const store = createStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);
