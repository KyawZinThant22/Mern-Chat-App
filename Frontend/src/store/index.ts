import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/index';
import { selectedChatReducer } from './reducers/chat/selectedChat';
import { chatReducer } from './reducers/chat';



const store = configureStore({
   reducer: {
      auth: authReducer,
      selectedChat : selectedChatReducer,
      chat : chatReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

const { dispatch } = store;

export { dispatch };
