// selectedChatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedChatState {
  chatId: string | null;
}

const initialState: any = {
  chatId: null,
};

const selectedChatSlice = createSlice({
  name: 'selectedChat',
  initialState,
  reducers: {
    selectChat: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
  },
});

export const { selectChat } = selectedChatSlice.actions;
export const selectedChatReducer = selectedChatSlice.reducer;
