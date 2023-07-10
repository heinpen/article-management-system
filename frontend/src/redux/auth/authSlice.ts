import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './authTnunk';

export interface AuthState {
  isAuth: boolean;
  alert: {
    isActive: boolean;
    message: string;
    severity: string;
  };
  query: {
    isPending: boolean;
  };
  userData: {
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

type setAlertPayload = Omit<AuthState['alert'], 'isActive'>;

const localAuth = localStorage.getItem('isAuth') === 'true';

const initialState: AuthState = {
  isAuth: localAuth,
  alert: {
    isActive: false,
    message: '',
    severity: '',
  },
  query: {
    isPending: false,
  },
  userData: {
    username: '',
    firstName: '',
    lastName: '',
    avatar: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },

    logout: (state) => {
      state.isAuth = false;
    },

    setAlert: (state, action: PayloadAction<setAlertPayload>) => {
      const { message, severity } = action.payload;
      state.alert.message = message;
      state.alert.severity = severity;
      state.alert.isActive = true;
    },

    clearAlert: (state) => {
      state.alert.message = '';
      state.alert.severity = '';
      state.alert.isActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      setTimeout(() => {
        state.isAuth = true;
      }, 1000);

      state.query.isPending = false;
    });

    builder.addCase(loginUser.pending, (state, action) => {
      state.query.isPending = true;
      state.alert.isActive = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.query.isPending = false;

      state.alert.message = action.payload as string;
      state.alert.severity = 'error';
      state.alert.isActive = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
