import React from 'react'
import ReactDOM from 'react-dom/client'

import router from './router'
import { RouterProvider} from 'react-router-dom'
import './index.scss'

import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import cartReducer from './reducers/cartReducer';

const store = legacy_createStore(
  cartReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
)
