import React from 'react';
import Aux from '../../hoc/Cover';
import Style from './Layout.module.css';

const layout = (props) => (
  <Aux>
    <div>Toolbar, Backdrop, SideDrawer</div>
    <main className={Style.content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;