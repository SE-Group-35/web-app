import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// import { createSelector } from 'reselect';

/*
    Slice to use if some states are needed 
    when implementing the UIs
*/

const slice = createSlice({
  name: "System",
  initialState: {
    error: null,
    creatingUser: false,
    process: false,
    fetchingData: false,
    startLocation: { lat: 6.9327, lng: 79.8438 },
    
  },
  reducers: {
    //Events -> Event Handlers\

    updateStartLocation(system, action) {
      system.startLocation = action.payload;
    },
    updateStartLocationToInitial(system, action) {
      system.startLocation = { lat: 6.9327, lng: 79.8438 };
      
    },

    processRequested(system, action) {
      system.process = true;
    },
    processCompleted(system, action) {
      system.error = null;
      system.process = false;
    },

    processFailed(system, action) {
      system.error = "Delete User Failed...";
      system.process = false;
    },
    createUserRequested(system, action) {
      system.creatingUser = true;
    },
    userSuccessfullyCreated(system, action) {
      system.error = null;
      system.creatingUser = false;
    },

    createUserFailed(system, action) {
      system.error = "Creating User Failed...";
      system.creatingUser = false;
    },
    fetchRequested(system, action) {
      system.fetchingData = true;
    },
    fetchCompleted(system, action) {
      system.error = null;
      system.fetchingData = false;
    },

    fetchFailed(system, action) {
      system.error = "Delete User Failed...";
      system.fetchingData = false;
    },
  },
});

//Reducer
export default slice.reducer;

//Action Creators
export const {
  createUserRequested,
  userSuccessfullyCreated,
  createUserFailed,
  processRequested,
  processCompleted,
  processFailed,
  fetchRequested,
  fetchCompleted,
  fetchFailed,
  updateStartLocation,
} = slice.actions;

//Action Invokers

//Selectors
export const getCreateUserStatus = createSelector(
  (state) => state.system.creatingUser,
  (s) => s
);
export const getProcessStatus = createSelector(
  (state) => state.system.process,
  (s) => s
);

export const getFetchStatus = createSelector(
  (state) => state.system.fetchingData,
  (s) => s
);

export const getStartLocation = createSelector(
  (state) => state.system.startLocation,
  (s) => s
);
