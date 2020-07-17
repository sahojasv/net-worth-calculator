import React from 'react';
import reactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import { getStore } from './utility/AppState/getStore';
import './assets/main.css';

const currentStore = getStore();

const render = (store) => {
  reactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('AppContainer')
  );
};

render(currentStore);
