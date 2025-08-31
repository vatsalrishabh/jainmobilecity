"use client";
import React, { useState } from 'react';
import BottomNavbar from './BottomNavbar';
import SideNavbar from './SideNavbar';
import RightSideDisplay from './RightSideDisplay';
import AllUsers from './AllUsers';
import AllSales from './AllSales';
import CRUDProducts from './CRUDProducts';

const AdminDashBoard = () => {
  const componentMapping: Record<string, JSX.Element> = {
    crudOperation: <CRUDProducts />,
    allUser: <AllUsers />,
    allSales: <AllSales />,
  };

  const [rightComponent, setRightCom] = useState<JSX.Element>(
    componentMapping.crudOperation
  );

  const changeChildComponent = (key: string) => {
    if (componentMapping[key]) {
      setRightCom(componentMapping[key]);
    }
  };
console.log(rightComponent)
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
