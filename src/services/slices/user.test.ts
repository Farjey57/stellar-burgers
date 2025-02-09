import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { configureStore } from '@reduxjs/toolkit';
import userSlice, {
  registerUser,
  userAction,
  loginUser,
  fetchUser,
  updateUser,
  logoutUser
} from './user';
import { TUser } from '@utils-types';

jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('[userSlice] асинхронные экшены', () => {
  describe('санка fetchUser', () => {
    it('pending устанавливает isLoading в true', () => {
      store.dispatch(fetchUser.pending(''));

      const state = store.getState().user;
      expect(state.isLoading).toBe(true);
    });

    it('fulfilled устанавливает данные в стор', async () => {
      (getUserApi as jest.Mock).mockResolvedValue({
        user: mockUser
      });

      await store.dispatch(fetchUser());

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockUser);
    });

    it('rejected устанавливает ошибку', async () => {
      (getUserApi as jest.Mock).mockRejectedValue({
        message: 'Ошибка загрузки'
      });

      await store.dispatch(fetchUser());

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
    });
  });

  describe('санка loginUser', () => {
    it('fulfilled устанавливает данные в стор', async () => {
      const loginData: TLoginData = {
        email: 'test@example.com',
        password: 'password'
      };
      (loginUserApi as jest.Mock).mockResolvedValue({
        user: mockUser,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      });

      await store.dispatch(loginUser(loginData));

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockUser);
    });
  });

  describe('санка registerUser', () => {
    it('fulfilled устанавливает данные в стор', async () => {
      const registerData: TRegisterData = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User'
      };
      (registerUserApi as jest.Mock).mockResolvedValue({
        user: mockUser,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      });

      await store.dispatch(registerUser(registerData));

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockUser);
    });
  });

  describe('санка updateUser', () => {
    it('fulfilled устанавливает данные в стор', async () => {
      const updateData: TRegisterData = {
        email: 'testup@example.com',
        password: 'passwordup',
        name: 'Test User up'
      };
      (updateUserApi as jest.Mock).mockResolvedValue({ user: mockUser });

      await store.dispatch(updateUser(updateData));

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockUser);
    });
  });

  describe('санка logoutUser', () => {
    it('fulfilled очищает данные из стора о пользователе', async () => {
      (logoutApi as jest.Mock).mockResolvedValue({});

      await store.dispatch(logoutUser());

      const state = store.getState().user;
      expect(state.data).toBeNull;
    });
  });
});

describe('[userSlice] синхронные экшены', () => {
  it('setUserCheck флаг успешной проверки наличия юзера', () => {
    store.dispatch(userAction.setUserCheck());

    const state = store.getState().user;
    expect(state.userCheck).toBe(true);
  });

  it('userLogout удаление пользователя из стора', () => {
    store.dispatch(userAction.userLogout());

    const state = store.getState().user;
    expect(state.data).toBeNull;
  });
});
