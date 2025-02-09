import store, { rootReducer } from './store';
import ingredientsSlice from './slices/ingredients';
import burgerConstructorSlice from './slices/burgerConstructor';
import feedSlice from './slices/feed';
import userSlice from './slices/user';
import profileOrdersSlice from './slices/profileOrders';
import orderSlice from './slices/order';

const initialDefault = [undefined, { type: 'UNKNOWN_ACTION' }] as const;
//Когда редьюсер вызывается с undefined в качестве текущего состояния, это означает, что мы хотим получить начальное состояние (initial state) для этого редьюсера. В Redux это стандартное поведение. Если состояние не передано (или передано undefined), редьюсер должен вернуть начальное состояние.
//Экшен { type: 'UNKNOWN_ACTION' } — это "заглушка". В Redux редьюсер всегда должен возвращать состояние, даже если экшен ему неизвестен. Обычно это делается через default в switch

describe('[rootReducer]', () => {
  it('все редьюсеры корректно объединяются', () => {
    const initialState = rootReducer(...initialDefault);

    expect(rootReducer).toBeDefined();

    expect(initialState).toEqual({
      [ingredientsSlice.name]: ingredientsSlice.reducer(...initialDefault),
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer(
        ...initialDefault
      ),
      [feedSlice.name]: feedSlice.reducer(...initialDefault),
      [userSlice.name]: userSlice.reducer(...initialDefault),
      [profileOrdersSlice.name]: profileOrdersSlice.reducer(...initialDefault),
      [orderSlice.name]: orderSlice.reducer(...initialDefault)
    });
  });

  it('возвращается начальное состояние для каждого редьюсера', () => {
    const initialState = rootReducer(...initialDefault);

    // Проверяем начальное состояние каждого редьюсера
    expect(initialState[ingredientsSlice.name]).toEqual(
      ingredientsSlice.reducer(...initialDefault)
    );
    expect(initialState[burgerConstructorSlice.name]).toEqual(
      burgerConstructorSlice.reducer(...initialDefault)
    );
    expect(initialState[feedSlice.name]).toEqual(
      feedSlice.reducer(...initialDefault)
    );
    expect(initialState[userSlice.name]).toEqual(
      userSlice.reducer(...initialDefault)
    );
    expect(initialState[profileOrdersSlice.name]).toEqual(
      profileOrdersSlice.reducer(...initialDefault)
    );
    expect(initialState[orderSlice.name]).toEqual(
      orderSlice.reducer(...initialDefault)
    );
  });
});

describe('[store]', () => {
  it('стор создается с использованием rootReducer', () => {
    expect(store.getState()).toEqual(rootReducer(...initialDefault));
  });
});
