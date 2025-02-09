import { getFeedsApi, getOrderByNumberApi } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import feedSlice, { fetchOrderByNumber, fetchOrders } from './feed';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Order 1',
    createdAt: '2025-01-30',
    updatedAt: '2025-01-30',
    number: 1
  }
];

const store = configureStore({
  reducer: {
    feed: feedSlice.reducer
  }
});

describe('[feedSlice] асинхронные экшены', () => {
  describe('санка fetchOrders', () => {
    it('pending устанавливает isLoading в true и error в null', () => {
      store.dispatch(fetchOrders.pending(''));

      const state = store.getState().feed;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled устанавливает данные в стор', async () => {
      (getFeedsApi as jest.Mock).mockResolvedValue({
        orders: mockOrders,
        total: 10,
        totalToday: 3
      });

      await store.dispatch(fetchOrders());

      const state = store.getState().feed;
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(10);
      expect(state.totalToday).toBe(3);
    });

    it('rejected устанавливает ошибку', async () => {
      (getFeedsApi as jest.Mock).mockRejectedValue({
        message: 'Ошибка загрузки'
      });

      await store.dispatch(fetchOrders());

      const state = store.getState().feed;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки');
    });
  });

  describe('санка fetchOrderByNumber', () => {
    it('pending устанавливает isLoading в true и error в null', () => {
      store.dispatch(fetchOrderByNumber.pending('1', 1));

      const state = store.getState().feed;
      expect(state.isLoadingByNumber).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled устанавливает данные в стор', async () => {
      (getOrderByNumberApi as jest.Mock).mockResolvedValue({
        orders: [mockOrders[0]]
      });

      await store.dispatch(fetchOrderByNumber(1));

      const state = store.getState().feed;
      expect(state.isLoadingByNumber).toBe(false);
      expect(state.orderPage).toEqual(mockOrders[0]);
    });

    it('rejected устанавливает ошибку', async () => {
      (getOrderByNumberApi as jest.Mock).mockRejectedValue({
        message: 'Ошибка загрузки'
      });

      await store.dispatch(fetchOrderByNumber(1));

      const state = store.getState().feed;
      expect(state.isLoadingByNumber).toBe(false);
      expect(state.error).toBe('Ошибка загрузки');
    });
  });
});
