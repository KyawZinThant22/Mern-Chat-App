// selectedChatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: any = {
  selectedChat : ""
};

const selectedChatSlice = createSlice({
  name: 'selectedChat',
  initialState,
  reducers: {
    selectChat: (state, action: PayloadAction<string>) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { selectChat } = selectedChatSlice.actions;
export const selectedChatReducer = selectedChatSlice.reducer;
