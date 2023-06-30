import {configureStore} from '@reduxjs/toolkit';
import mainScreenStateSlice from './MainScreen';
import drivingScreenStateSlice from './DrivingScreen';
import paymentScreenStateSlice from './PaymentScreen';

const ReduxStore = configureStore({
  reducer: {
    mainScreenState: mainScreenStateSlice.reducer,
    drivingScreenState: drivingScreenStateSlice.reducer,
    paymentScreenState: paymentScreenStateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
export default ReduxStore;
