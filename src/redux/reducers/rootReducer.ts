import { combineReducers } from '@reduxjs/toolkit';
import tablesReducer from './tablesReducer';

const rootReducer = combineReducers({
  tables: tablesReducer,
});

export default rootReducer;
