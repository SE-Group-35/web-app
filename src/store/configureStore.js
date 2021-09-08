import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer } from './reducer';
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import toastGenerator from "./middleware/toast";
// import { loadState } from './localStorage';

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: false,
                thunk: { extraArgument: { getFirestore, getFirebase } }
            }),
            toastGenerator
        ],
        // preloadedState: loadState()
    });
}