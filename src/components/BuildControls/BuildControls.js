import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import Style from './BuildControls.module.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={Style.BuildControls}>
        {controls.map((ctrl) => {
            return <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
            />
        })}
    </div>
);

export default buildControls;