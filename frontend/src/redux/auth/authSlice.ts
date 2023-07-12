import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isLogged: boolean;
}

const localAuth = localStorage.getItem('isLogged') === 'true';

const initialState: AuthState = {
  isLogged: localAuth,
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
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
