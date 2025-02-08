import burgerConstructorSlice, {
  burgerConstructorAction
} from './burgerConstructor';

const ingredients = [
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
  },
  {
    id: '3',
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'ингредиент соус',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0
  }
];

const initialDefault = [undefined, { type: 'UNKNOWN_ACTION' }] as const;

afterEach(() => {
  burgerConstructorSlice.reducer(...initialDefault);
});

describe('[burgerConstructorSlice] редьюсер слайса burgerConstructorSlice', () => {
  it('добавление булки в конструктор', () => {
    const newState = burgerConstructorSlice.reducer(
      undefined,
      burgerConstructorAction.addToConstructor(ingredients[0])
    );
    expect(newState.bun).toEqual({
      ...ingredients[0],
      id: expect.any(String)
    });
  });

  it('добавление ингредиента в конструктор', () => {
    const newState = burgerConstructorSlice.reducer(
      undefined,
      burgerConstructorAction.addToConstructor(ingredients[1])
    );
    expect(newState.ingredients[0]).toEqual({
      ...ingredients[1],
      id: expect.any(String)
    });
  });

  it('удаление ингредиента из конструктора', () => {
    const newState = burgerConstructorSlice.reducer(
      {
        bun: null,
        ingredients: [ingredients[1]]
      },
      burgerConstructorAction.removeFromConstructor(ingredients[1])
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  it('очищение массива', () => {
    const newState = burgerConstructorSlice.reducer(
      {
        bun: ingredients[0],
        ingredients: [ingredients[1], ingredients[2]]
      },
      burgerConstructorAction.clearConstructor()
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });

  describe('изменение порядка ингредиентов', () => {
    it('перемещение вверх', () => {
      const newState = burgerConstructorSlice.reducer(
        {
          bun: null,
          ingredients: [ingredients[1], ingredients[2]]
        },
        burgerConstructorAction.replaceIngredient({
          index: 1,
          direction: 'up'
        })
      );
      expect(newState.ingredients[0]).toEqual({
        ...ingredients[2],
        id: expect.any(String)
      });
    });

    it('перемещение вниз', () => {
      const newState = burgerConstructorSlice.reducer(
        {
          bun: null,
          ingredients: [ingredients[1], ingredients[2]]
        },
        burgerConstructorAction.replaceIngredient({
          index: 0,
          direction: 'down'
        })
      );
      expect(newState.ingredients[0]).toEqual({
        ...ingredients[2],
        id: expect.any(String)
      });
    });

    it('отсутствие перемещения вверх для верхнего элемента', () => {
      const newState = burgerConstructorSlice.reducer(
        {
          bun: null,
          ingredients: [ingredients[1], ingredients[2]]
        },
        burgerConstructorAction.replaceIngredient({
          index: 0,
          direction: 'up'
        })
      );
      expect(newState.ingredients[0]).toEqual({
        ...ingredients[1],
        id: expect.any(String)
      });
    });

    it('отсутствие перемещения вниз для нижнего элемента', () => {
      const newState = burgerConstructorSlice.reducer(
        {
          bun: null,
          ingredients: [ingredients[1], ingredients[2]]
        },
        burgerConstructorAction.replaceIngredient({
          index: 1,
          direction: 'down'
        })
      );
      expect(newState.ingredients[1]).toEqual({
        ...ingredients[2],
        id: expect.any(String)
      });
    });

    it('индекс вне массива ингредиентов', () => {
      const newState = burgerConstructorSlice.reducer(
        {
          bun: null,
          ingredients: [ingredients[1], ingredients[2]]
        },
        burgerConstructorAction.replaceIngredient({
          index: 4,
          direction: 'up'
        })
      );
      expect(newState.ingredients[1]).toEqual({
        ...ingredients[2],
        id: expect.any(String)
      });
    });
  });
});
