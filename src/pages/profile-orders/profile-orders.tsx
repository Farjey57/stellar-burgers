import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchProfileOrders,
  profileOrdersSelectors
} from '../../services/slices/profileOrders';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, []);

  const orders: TOrder[] = useSelector(profileOrdersSelectors.getProfileOrders);

  return <ProfileOrdersUI orders={orders} />;
};
