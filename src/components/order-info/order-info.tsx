import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';
import { feedSelectors, fetchOrderByNumber } from '../../services/slices/feed';
import { profileOrdersSelectors } from '../../services/slices/profileOrders';

export const OrderInfo: FC = () => {
  const number = useParams().number || '';
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelectors.getIngredients);
  const orderData =
    useSelector((state) =>
      feedSelectors.getOrderByNumber(state, Number(number))
    ) || useSelector(feedSelectors.getOrderPage);

  console.log(orderData);

  useEffect(() => {
    console.log('зашли в useEffect');
    if (!orderData) {
      console.log('диспатчим');
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
