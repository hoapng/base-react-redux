import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import 'nprogress/nprogress.css'
import { PersistGate } from 'redux-persist/integration/react'
// import App from './App';
// import User from './components/User/User';
// import Admin from './components/Admin/Admin';
// import HomePage from './components/Home/HomePage';
// import Dashboard from './components/Admin/Content/Dashboard';
// import ManageUser from './components/Admin/Content/ManageUser';
// import Login from './components/Auth/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode>
      <App />
    </React.StrictMode> */}
      <BrowserRouter>
        {/* <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<User />} />
        </Route>

        <Route path="admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes> */}
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
