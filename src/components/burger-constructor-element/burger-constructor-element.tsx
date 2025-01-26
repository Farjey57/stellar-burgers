import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { burgerConstructorAction } from '../../services/slices/burgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        burgerConstructorAction.replaceIngredient({
          index: index,
          direction: 'down'
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        burgerConstructorAction.replaceIngredient({
          index: index,
          direction: 'up'
        })
      );
    };

    const handleClose = () => {
      dispatch(burgerConstructorAction.removeFromConstructor(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
