import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { selectChat } from '../store/reducers/chat/selectedChat';
import { getSenderFull, getSender } from '../config/ChatLogic';
import ProfileModal from './miscellaneous/ProfileModel';

interface ISingleChat {
   setFetchAgain: () => void;
   fetchAgain: boolean;
}
const SingleChat = ({ setFetchAgain, fetchAgain }: ISingleChat) => {
   const { selectedChat } = useAppSelector((state: RootState) => state.selectedChat);
   const { user } = useAppSelector((state: RootState) => state.auth);
   const dispatch = useAppDispatch();
   return (
      <>
         {selectedChat ? (
            <>
               <Text
                  fontSize={{ base: '28px', md: '30px' }}
                  pb={3}
                  px={2}
                  w="100%"
                  fontFamily="Work sans"
                  display="flex"
                  justifyContent={{ base: 'space-between' }}
                  alignItems="center"
               >
                  <IconButton
                     aria-label="cancel icon"
                     display={{ base: 'flex', md: 'none' }}
                     icon={<ArrowBackIcon />}
                     onClick={() => dispatch(selectChat(''))}
                  />
                  {!selectedChat.isGroupChat ? (
                     <>
                        {getSender(user, selectedChat.users)}
                        <ProfileModal
                           user={getSenderFull(user, selectedChat.users)}
                           children={undefined}
                        />
                     </>
                  ) : (
                     <>{selectedChat.chatName.toUpperCase()}</>
                  )}
               </Text>
               <Box
                  display="flex"
                  flexDir="column"
                  justifyContent="flex-end"
                  p={3}
                  bg="#E8E8E8"
                  w="100%"
                  h="100%"
                  borderRadius="lg"
                  overflowY="hidden"
               ></Box>
            </>
         ) : (
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
               <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                  Click on a user to start chatting
               </Text>
            </Box>
         )}
      </>
   );
};

export default SingleChat;
