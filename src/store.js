import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';
import { parse } from "path";
const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
    // apiKey: "AIzaSyDzTETM4WbbnsENzoqc4HVI3faSwswd4Uw",
    // authDomain: "reactclientpanel-59da6.firebaseapp.com",
    // databaseURL: "https://reactclientpanel-59da6.firebaseio.com",
    // projectId: "reactclientpanel-59da6",
    // storageBucket: "reactclientpanel-59da6.appspot.com",
    // messagingSenderId: "100097213407",
    // appId: "1:100097213407:web:98f3f7ff315873310afa6a",
    // measurementId: "G-MPTT8M7GM7"
}
//react redux firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//initialize firebase instance

firebase.initializeApp(firebaseConfig);

//initialize firestore

const firestore = firebase.firestore();
// add reacrReduxFirebase enhancer when making store creator

// const createStoreWithFirebase = compose(
//     reactReduxFirebase(firebase, rrfConfig),
//     reduxFirestore(firebase)
// )(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});

//check for settings in local storage

if (localStorage.getItem('settings') == null) {

    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    };
    
    // Set to localStorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//create initial state

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

//create store
const store = createStore(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
export default store;
