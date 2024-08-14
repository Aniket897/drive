import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import documentSlice from "./slices/documentSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  //   whitelist: [],
  blacklist: ["documents"],
};

const rootReducers = combineReducers({
  auth: authSlice,
  document: documentSlice,
});

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducers),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
