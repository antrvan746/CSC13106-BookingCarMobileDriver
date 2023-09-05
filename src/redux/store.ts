/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import mainScreenStateSlice from './MainScreen';
import drivingScreenStateSlice from './DrivingScreen';
import paymentScreenStateSlice from './PaymentScreen';
import LoginStateSlice from './LoginState';
import locationIQApi from '../query/LocationIQ';

const ReduxStore = configureStore({
  reducer: {
    mainScreenState: mainScreenStateSlice.reducer,
    drivingScreenState: drivingScreenStateSlice.reducer,
    paymentScreenState: paymentScreenStateSlice.reducer,
    loginState: LoginStateSlice.reducer,
    [locationIQApi.reducerPath]: locationIQApi.reducer
  },
  middleware: (getDafaultMiddleware) => getDafaultMiddleware().concat([
    locationIQApi.middleware
  ])
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
export default ReduxStore;
