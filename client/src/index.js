import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataProvider from './redux/store';
import './styles/css/main.css';
import AlertTemplate from 'react-alert-template-basic';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <DataProvider>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </DataProvider>,
  document.getElementById('root')
);