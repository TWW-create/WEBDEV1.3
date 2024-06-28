import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#000000",
            colorPrimaryHover: "#000000",
          },
        },
        token: {
          borderRadius: "4px",
          colorPrimary: "#000000",
        },
      }}  
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
