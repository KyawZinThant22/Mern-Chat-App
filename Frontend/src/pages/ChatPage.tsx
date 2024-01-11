import { Box } from '@chakra-ui/react';

import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/miscellaneous/MyChats';
import ChatBox from '../components/miscellaneous/ChatBox';

const ChatPage = () => {
   return (
      <div style={{ width: '100%' }}>
         <SideDrawer />

         <Box display="flex" justifyContent="space-between" width="100%" h="91.5vh" p="10px">
            <MyChats />
            <ChatBox />
         </Box>
      </div>
   );
};

export default ChatPage;
