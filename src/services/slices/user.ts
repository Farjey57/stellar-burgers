import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from './sliceNames';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  data: TUser | null;
  isLoading: boolean;
  userCheck: boolean;
  success: boolean;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  userCheck: false,
  success: false
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  selectors: {
    getUser: (state) => state.data,
    getUserCheck: (state) => state.userCheck
  },
  reducers: {
    setUserCheck: (state) => {
      state.userCheck = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLoading = false;
      });
  }
});

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUser`,
  getUserApi
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (data: TRegisterData) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        dispatch(userAction.userLogout()); // удаляем пользователя из хранилища
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const userAction = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice;
