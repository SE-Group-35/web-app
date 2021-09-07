import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer } from './reducer';
// import { loadState } from './localStorage';
import toastGenerator from "./middleware/toast";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: false
            }),
            toastGenerator
        ],
        // preloadedState: loadState()
    });
}