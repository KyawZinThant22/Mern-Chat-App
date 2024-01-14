import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import SingleChat from '../SingleChat';

interface IChatBox {
   fetchAgain: boolean;

   setFetchAgain: () => void;
}

const ChatBox = ({ fetchAgain, setFetchAgain }: IChatBox) => {
   const { selectedChat } = useAppSelector((state: RootState) => state.selectedChat);
   return (
      <Box
         display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
         alignItems="center"
         flexDir="column"
         p={3}
         bg="white"
         w={{ base: '100%', md: '68%' }}
         borderRadius="lg"
         borderWidth="1px"
      >
         <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
   );
};

export default ChatBox;
