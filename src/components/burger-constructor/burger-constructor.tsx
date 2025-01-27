import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorAction,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructor';
import {
  orderAction,
  orderSelectors,
  postOrder
} from '../../services/slices/order';
import { userSelectors } from '../../services/slices/user';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const Items = useSelector(burgerConstructorSelectors.getAllIngredients);
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const location = useLocation();
  const navigate = useNavigate();

  const constructorItems = {
    bun: Items.bun,
    ingredients: Items.ingredients
  };

  const orderRequest = useSelector(orderSelectors.getIsLoading);

  const orderModalData = useSelector(orderSelectors.getIsNewOrderData);

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login', { state: location });
    }

    if (!constructorItems.bun || orderRequest) {
      return;
    }

    const data: string[] = constructorItems.ingredients.reduce<string[]>(
      (acc, ingredient) => {
        acc.push(ingredient._id);
        return acc;
      },
      [constructorItems.bun._id]
    );
    data.push(constructorItems.bun._id);
    dispatch(postOrder(data))
      .unwrap()
      .catch(() => {})
      .finally(() => dispatch(burgerConstructorAction.clearConstructor()));
  };

  const closeOrderModal = () => {
    if (!orderRequest) {
      dispatch(orderAction.clearOrder());
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
