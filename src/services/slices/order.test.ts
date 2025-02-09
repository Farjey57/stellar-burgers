import { orderBurgerApi } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import orderSlice, { orderAction, postOrder } from './order';
import { TOrder } from '@utils-types';

const mockOrder = ['ingredient1', 'ingredient2'];
const mockOrderApi: TOrder = {
  _id: '1',
  ingredients: ['ingredient1', 'ingredient2'],
  status: 'done',
  name: 'Order 1',
  createdAt: '2025-01-30',
  updatedAt: '2025-01-30',
  number: 1
};

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn()
}));

const store = configureStore({
  reducer: {
    order: orderSlice.reducer
  }
});

describe('[orderSlice] асинхронные экшены', () => {
  describe('санка postOrder', () => {
    it('pending устанавливает isLoading в true и error в null', () => {
      store.dispatch(postOrder.pending('', mockOrder));

      const state = store.getState().order;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled устанавливает данные в стор', async () => {
      (orderBurgerApi as jest.Mock).mockResolvedValue({
        order: mockOrderApi,
        name: 'test'
      });

      await store.dispatch(postOrder(mockOrder));

      const state = store.getState().order;
      expect(state.isLoading).toBe(false);
      expect(state.newOrderData).toEqual(mockOrderApi);
    });

    it('rejected устанавливает ошибку', async () => {
      (orderBurgerApi as jest.Mock).mockRejectedValue({
        message: 'Ошибка загрузки'
      });

      await store.dispatch(postOrder(mockOrder));

      const state = store.getState().order;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки');
    });
  });
});

describe('[orderSlice] синхронные экшены', () => {
  it('очищение массива', () => {
    store.dispatch(orderAction.clearOrder());

    const state = store.getState().order;
    expect(state).toEqual({
      newOrderData: null,
      isLoading: false,
      error: null
    });
  });
});
