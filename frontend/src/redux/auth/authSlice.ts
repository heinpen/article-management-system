import {
  Action,
  AnyAction,
  AsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '@redux/store';

export interface AuthState {
  isLogged: boolean;
  isRegistered: boolean;
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

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const localAuth = localStorage.getItem('isLogged') === 'true';

const initialState: AuthState = {
  isLogged: localAuth,
  isRegistered: false,
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

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

function isFulfilledAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/fulfilled');
}

const updateStateFromAction = (state: RootState['auth'], message: string) => {
  state.query.isPending = false;
  state.alert.message = message;
  state.alert.isActive = true;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
      localStorage.setItem('isLogged', 'true');
    },

    logout: (state) => {
      state.isLogged = false;
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
    builder
      .addMatcher(isPendingAction, (state, action) => {
        state.query.isPending = true;
        state.alert.isActive = false;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.alert.severity = 'error';
        updateStateFromAction(state, action.payload as string);
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        state.alert.severity = 'success';
        updateStateFromAction(state, action.payload as string);
      });
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
