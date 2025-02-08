import { getIngredientsApi } from '@api';
import ingredientsSlice, { fetchIngredients } from './ingredients';
import { configureStore } from '@reduxjs/toolkit';

const mockIngredients = [
  {
    id: '1',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'булка 1',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    id: '2',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'ингредиент начинка',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer
  }
});

describe('[ingredientsSlice] асинхронные экшены', () => {
  describe('санка fetchIngredients', () => {
    it('pending устанавливает isLoading в true и error в null', () => {
      store.dispatch(fetchIngredients.pending(''));

      const state = store.getState().ingredients;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled устанавливает данные в стор', async () => {
      (getIngredientsApi as jest.Mock).mockResolvedValue(mockIngredients);

      await store.dispatch(fetchIngredients());

      const state = store.getState().ingredients;
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockIngredients);
    });

    it('rejected устанавливает ошибку', async () => {
      (getIngredientsApi as jest.Mock).mockRejectedValue({
        message: 'Ошибка загрузки'
      });

      await store.dispatch(fetchIngredients());

      const state = store.getState().ingredients;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки');
    });
  });
});
