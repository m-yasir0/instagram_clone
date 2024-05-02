import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares = [reduxThunk];

const store = configureStore({ reducer: rootReducer, middleware: middlewares });

export default store;
