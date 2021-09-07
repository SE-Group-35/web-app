import { combineReducers } from 'redux';
import { entitiesReducer } from './entities/entities';
import authReducer from './auth';
import systemReducer from './system';

export const reducer = combineReducers({
    entities: entitiesReducer,
    auth: authReducer,
    system: systemReducer
});