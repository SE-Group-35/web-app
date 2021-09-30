import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import createStore from "./store/configureStore";
import firebase, { rrfConfig } from "./firebase";
import { saveState } from "./store/localStorage";

require("./firebase");

const store = createStore();
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    firebase: store.getState().firebase,
    firestore: store.getState().firestore,
    system: store.getState().system,
  });
});

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
