import React from 'react';
import '../Layout/Layout.css'; // Ensure that this file contains the required CSS
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

const Layout = () => {
  return (
    <div className="body">
      <SideBar className="sidebar"></SideBar>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
