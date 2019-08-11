import React from 'react';
import Style from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={Style.BuildControl}>
        <div className={Style.Label}>{props.label}</div>
        <button className={Style.Less} onClick={props.removed}>Less</button>
        <button className={Style.More} onClick={props.added}>More</button>
    </div>
);

export default buildControl;