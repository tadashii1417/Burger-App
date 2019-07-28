import React from 'react';
import style from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients);
  return (
    <div className={style.Burger}>
      <BurgerIngredient type="bread-top"/>
      {
        transformedIngredients.map((ingredient, index) => {
          return <BurgerIngredient type={ingredient}/>
        })
      }
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;