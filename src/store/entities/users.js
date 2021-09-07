import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

//Strategies Slice
const slice = createSlice({
    name: "Users",
    initialState: {
        usersList: [],
        usersLoading: false
    },
    reducers: {

        //Events -> Event Handlers
        usersRequested(users, action) {
            users.usersLoading = true;
        },

        usersRequestFailed(users, action) {
            users.usersLoading = false;
        },

        usersReceived(users, action) {
            users.usersList = action.payload;
            users.usersLoading = false;
        },

    }
});

//Reducer
export default slice.reducer;

//Action Creators
export const {
    usersReceived,
    usersRequested,
    usersRequestFailed,
} = slice.actions;


//Selectors
export const getUsersList = createSelector(
    state => state.entities.users,
    s => s.usersList
);

