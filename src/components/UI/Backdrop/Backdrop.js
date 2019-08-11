import React from 'react';
import Style from './Backdrop.module.css';

const backDrop = (props) => (
  props.show ? 
  <div className={Style.Backdrop} onClick={props.clicked}>
  </div> : null
);

export default backDrop;