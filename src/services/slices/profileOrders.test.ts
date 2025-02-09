import { getOrdersApi } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import profileOrdersSlice, { fetchProfileOrders } from './profileOrders';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Order 1',
    createdAt: '2025-01-30',
    updatedAt: '2025-01-30',
    number: 1
  },
  {
    _id: '2',
    ingredients: ['ingredient3', 'ingredient4'],
    status: 'done',
    name: 'Order 2',
    createdAt: '2025-01-30',
    updatedAt: '2025-01-30',
    number: 2
  }
];

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

const store = configureStore({
  reducer: {
    profileOrders: profileOrdersSlice.reducer
  }
});

describe('[profileOrdersSlice] асинхронные экшены', () => {
  describe('санка fetchProfileOrders', () => {
    it('pending устанавливает isLoading в true и error в null', () => {
      store.dispatch(fetchProfileOrders.pending(''));

      const state = store.getState().profileOrders;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled устанавливает данные в стор', async () => {
      (getOrdersApi as jest.Mock).mockResolvedValue(mockOrders);

      await store.dispatch(fetchProfileOrders());

      const state = store.getState().profileOrders;
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
    });

    it('rejected устанавливает ошибку', async () => {
      (getOrdersApi as jest.Mock).mockRejectedValue({
        message: 'Ошибка загрузки'
      });

      await store.dispatch(fetchProfileOrders());

      const state = store.getState().profileOrders;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки');
    });
  });
});
