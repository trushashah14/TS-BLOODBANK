import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from './redux/store';

// Create a root element to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application with Redux integration and Ant Design configuration
root.render(
  <Provider store={store}>
    {/* Wrap the application with Redux Provider to make the store accessible */}
    <ConfigProvider
      theme={{
        // Configure Ant Design theme with custom colors
        token: {
          colorPrimary: "#3F497F", // Primary color
          colorBorder: "#802828", // Border color
        },
      }}
    >
      {/* Wrap the application with Ant Design ConfigProvider to apply the theme */}
      <App />
      {/* Render the main App component */}
    </ConfigProvider>
  </Provider>
);

// Report web vitals for performance analysis
reportWebVitals();