import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationProp } from '@react-navigation/native';

import { logOut, signIn, signInWithGoogle, signUp } from '../../services/auth';
import { RootState } from '../reducer';

interface AuthState {
  room: string;
  currentUser: FirebaseAuthTypes.User | null;
  userData: UserDataType | null;
  initialLoading: boolean;
  loading: boolean;
  error: string | null;
}

export type UserDataType = {
  name?: string;
  email?: string;
  password?: string;
};

// export const initializeApp = createAsyncThunk('auth/initializeApp', async (_, { dispatch }) => {
//   dispatch(setInitialLoading(true));
//   await handleAuthStateChange(dispatch);
// });

export const signUpAsync = createAsyncThunk<void, UserDataType, { state: RootState }>(
  'auth/signUp',
  async (userData, { dispatch }) => {
    signUp(dispatch, userData);
  }
);

export const signInAsync = createAsyncThunk<void, UserDataType, { state: RootState }>(
  'auth/signIn',
  async (userData, { dispatch }) => {
    signIn(dispatch, userData);
  }
);

export const signInWithGoogleAsync = createAsyncThunk('auth/signInWithGoogle', async (_, { dispatch }) =>
  signInWithGoogle(dispatch)
);

export const logOutAsync = createAsyncThunk<void, NavigationProp<any>>(
  'auth/logOut',
  async (navigation, { dispatch }) => {
    logOut(dispatch, navigation);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    room: '',
    currentUser: null,
    userData: null,
    initialLoading: false,
    loading: false,
    error: null
  } as AuthState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      state.currentUser = action.payload;
    },
    setInitialLoading: (state, action: PayloadAction<boolean>) => {
      state.initialLoading = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserDataType>) => {
      state.userData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    // builder.addCase(signUp.fulfilled, (state, action) => {
    //   // Обробник, якщо реєстрація успішна
    // });
    // builder.addCase(signIn.fulfilled, (state, action) => {
    //   // Обробник, якщо вхід успішний
    // });
    // Додайте обробники для інших екшенів
  }
});

export const { setCurrentUser, setLoading, setError, clearError, setUserData, setInitialLoading } = authSlice.actions;
export default authSlice.reducer;
