import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import './index.css';
import rootReducer from './Reducers'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


const router = (
  <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
  </BrowserRouter>
)

ReactDOM.render(router, document.getElementById('root'));
