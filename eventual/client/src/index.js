import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RegisterContextProvider } from "./components/RegisterContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RegisterContextProvider><App /></RegisterContextProvider>
  </React.StrictMode>

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
);