import React from 'react'
import { Global } from '@emotion/react';
import ReactDOM from 'react-dom/client'
import App from './App'
import { reset, global } from './styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={global} />
    <Global styles={reset} />
    <App />
  </React.StrictMode>,
)
