import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

const validPaymentScreenState = [
  'InProgress',
  'Confirming',
  'Succeed',
] as const;

export type PaymentScreenStateName = (typeof validPaymentScreenState)[number];
export const AppStateNameValues = [...validPaymentScreenState];

export type PaymentScreenState = {
  state: PaymentScreenStateName;
};

const initialState: PaymentScreenState = {
  state: 'InProgress',
};

export const paymentScreenStateSlice = createSlice({
  name: 'PaymentScreenState',
  initialState,
  reducers: {
    setPaymentScreenState: (
      state,
      action: PayloadAction<PaymentScreenState>,
    ) => {
      return {...action.payload};
    },
  },
});

export const {setPaymentScreenState} = paymentScreenStateSlice.actions;
export const selectPaymentScreenState = (state: RootState) =>
  state.paymentScreenState;
export default paymentScreenStateSlice;
