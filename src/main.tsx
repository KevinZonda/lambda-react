import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Entry} from "./Router.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Entry/>
  </React.StrictMode>,
)
