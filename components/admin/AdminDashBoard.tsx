"use client";
import React, { useState } from 'react';
import BottomNavbar from './BottomNavbar';
import SideNavbar from './SideNavbar';
import RightSideDisplay from './RightSideDisplay';
import AllUsers from './AllUsers';
import AllSales from './AllSales';
import CRUDProducts from './CRUDProducts';
import Dashboard from './Dashboard';

const AdminDashBoard = () => {
  const componentMapping: Record<string, JSX.Element> = {
    dashboard: <Dashboard />,
    crudOperation: <CRUDProducts />,
    allUser: <AllUsers />,
    allSales: <AllSales />,
    analytics: <div className="p-6 text-center text-gray-500">Analytics Dashboard - Coming Soon</div>,
    settings: <div className="p-6 text-center text-gray-500">Settings Panel - Coming Soon</div>,
  };

  const [rightComponent, setRightCom] = useState<JSX.Element>(
    componentMapping.dashboard
  );

  const changeChildComponent = (key: string) => {
    if (componentMapping[key]) {
      setRightCom(componentMapping[key]);
    }
  };

  return (
    <div className='lg:flex'>
      <div className='lg:block'>
        <SideNavbar changeRightComponent={changeChildComponent} />
      </div>
      <div className='lg:block flex-grow'>
        <RightSideDisplay rightComponent={rightComponent} />
      </div>
      <div className='sm:block lg:hidden'>
        <BottomNavbar changeRightComponent={changeChildComponent} />
      </div>
    </div>
  );
};

export default AdminDashBoard;
