import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authMiddleware } from '../Utils'
import apiSlice from './Services/apiSlice'
import authSlice from './Slice/authSlice'
import CourseSlice from './Slice/CourseSlice'
import cartSlice from './Slice/CartSlice'
import OrderSlice from './Slice/OrderSlice';
import PaymentSlice from './Slice/PaymentSlice';
import questionSlice from './Slice/questionSlice';

const cartPersistConfig  = {
    key: 'cart',
    storage,
    whitelist: ['cart'], // Specify which slices to persist
  };
  


const store = configureStore({
    reducer: {
        auth: authSlice,
        course:CourseSlice,
        order:OrderSlice,
        payment:PaymentSlice,
        question:questionSlice,
        cart: persistReducer(cartPersistConfig, cartSlice),
        [apiSlice.reducerPath]: apiSlice.reducer,
    }, 
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }).concat([authMiddleware, apiSlice.middleware]),
  

})
const persistor = persistStore(store);

setupListeners(store.dispatch)
export { store, persistor };
