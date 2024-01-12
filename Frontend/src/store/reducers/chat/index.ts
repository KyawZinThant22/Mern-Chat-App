// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  content: string;
}

interface ChatState {
  messages: Message[];
}

const initialState: any = {
  chat: ""
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<any>) => {
      state.chat = (action.payload);
    },
  },
});

export const { addChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
