import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuth: boolean;
  alert: {
    isActive: boolean;
    message: string;
    severity: string;
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
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
