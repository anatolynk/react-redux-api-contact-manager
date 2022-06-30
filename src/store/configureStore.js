import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import api from "./middleware/api";
import logger from "./middleware/logger";
import notification from "./middleware/notification";

export const store = configureStore({
  reducer: {
    usersSlice,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    api,
    logger,
    notification,
  ],
});
