import { feedSelectors } from '../slices/feed';
import { profileOrdersSelectors } from '../slices/profileOrders';
import { useSelector } from '../store';

export const orderDataCheck = (number: number) => {
  if (useSelector(profileOrdersSelectors.getProfileOrders).length) {
    const data = useSelector((state) =>
      profileOrdersSelectors.getProfileOrderByNumber(state, number)
    );
    if (data) return data;
  }

  if (useSelector(feedSelectors.getFeedOrders).length) {
    const data = useSelector((state) =>
      feedSelectors.getOrderByNumber(state, number)
    );
    if (data) return data;
  }

  if (useSelector(feedSelectors.getOrderPage)?.number === number) {
    return useSelector(feedSelectors.getOrderPage);
  }

  return null;
};
