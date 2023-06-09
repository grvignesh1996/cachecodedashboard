import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter basename="/demo/purple-react-free/template/demo_1/preview">
    <App />
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();