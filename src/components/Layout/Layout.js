import React from 'react';
import Aux from '../../hoc/Wrap';
import Style from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


const layout = (props) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={Style.content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;