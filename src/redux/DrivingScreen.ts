import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

const validDrivingScreenState = [
  'Arriving',
  'Arrived',
  'Carrying',
  'Finished',
] as const;

export type DrivingScreenStateName = (typeof validDrivingScreenState)[number];
export const AppStateNameValues = [...validDrivingScreenState];

export type DrivingScreenState = {
  state: DrivingScreenStateName;
};

const initialState: DrivingScreenState = {
  state: 'Arriving',
};

export const drivingScreenStateSlice = createSlice({
  name: 'DrivingScreenState',
  initialState,
  reducers: {
    setDrivingScreenState: (
      state,
      action: PayloadAction<DrivingScreenState>,
    ) => {
      return {...action.payload};
    },
  },
});

export const {setDrivingScreenState} = drivingScreenStateSlice.actions;
export const selectDrivingScreenState = (state: RootState) =>
  state.drivingScreenState;
export default drivingScreenStateSlice;
