import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

const validMainScreenState = ['Available', 'Unavailable'] as const;

export type MainScreenStateName = (typeof validMainScreenState)[number];
export const AppStateNameValues = [...validMainScreenState];

export type MainScreenState = {
  state: MainScreenStateName;
};

const initialState: MainScreenState = {
  state: 'Unavailable',
};

export const mainScreenStateSlice = createSlice({
  name: 'MainScreenState',
  initialState,
  reducers: {
    setMainScreenState: (state, action: PayloadAction<MainScreenState>) => {
      return {...action.payload};
    },
  },
});

export const {setMainScreenState} = mainScreenStateSlice.actions;
export const selectMainScreenState = (state: RootState) =>
  state.mainScreenState;
export default mainScreenStateSlice;
