import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storageModule from "redux-persist/lib/storage";
const storage = storageModule.default; 

console.log("MY STORAGE:", storage);
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    jobs: jobReducer,
    company:companySlice,
    application:applicationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export default store;