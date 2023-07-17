/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import mainScreenStateSlice from './MainScreen';
import drivingScreenStateSlice from './DrivingScreen';
import paymentScreenStateSlice from './PaymentScreen';
import LoginStateSlice from './LoginState';

const ReduxStore = configureStore({
  reducer: {
    mainScreenState: mainScreenStateSlice.reducer,
    drivingScreenState: drivingScreenStateSlice.reducer,
    paymentScreenState: paymentScreenStateSlice.reducer,
    loginState: LoginStateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
export default ReduxStore;
