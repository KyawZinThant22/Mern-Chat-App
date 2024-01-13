import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { RootState, dispatch } from '../../store';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/api';
import { addChat } from '../../store/reducers/chat';
import { AddIcon } from '@chakra-ui/icons';
import { selectChat } from '../../store/reducers/chat/selectedChat';
import ChatLoading from '../ChatLoading';
import { getSender } from '../../config/ChatLogic';
import GroupChatModal from './GroupChatModel';

const MyChats = () => {
   const { auth, chat, selectedChat } = useAppSelector((state: RootState) => state);
   const selectedchatData = selectedChat.selectedChat
   const toast = useToast();

   const fetchChat = async () => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         };

         const { data } = await axios.get(`${BACKEND_URL}chat`, config);
         dispatch(addChat(data));
      } catch (error) {
         toast({
            title: 'Error Occured!',
            description: 'Failed to Load the chats',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
         });
      }
   };

   useEffect(() => {
      fetchChat();
   }, []);
   return (
      <Box
         display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
         flexDir="column"
         alignItems="center"
         p={3}
         bg="white"
         w={{ base: '100%', md: '31%' }}
         borderRadius="lg"
         borderWidth="1px"
      >
         <Box
            pb={3}
            px={3}
            fontSize={{ base: '28px', md: '30px' }}
            fontFamily="Work sans"
            display="flex"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
         >
            My Chats
            <GroupChatModal>
            <Button
               display="flex"
               fontSize={{ base: '17px', md: '10px', lg: '17px' }}
               rightIcon={<AddIcon />}
            >
               New Group Chat
            </Button>
            </GroupChatModal>
         </Box>
         <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
         >
            {chat.chat.length > 0 ? (
               <Stack overflowY="scroll">
                  {chat.chat?.map((chatt: any) => {
                     return (
                        <Box
                           onClick={() => dispatch(selectChat(chatt))}
                           cursor="pointer"
                           bg={selectedchatData === chatt ? '#38B2AC' : '#E8E8E8'}
                           color={selectedchatData === chatt ? 'white' : 'black'}
                           px={3}
                           py={2}
                           borderRadius="lg"
                           key={chatt._id}
                        >
                           <Text>
                              {!chatt.isGroupChat
                                 ? getSender(auth?.user, chatt?.users)
                                 : chatt.chatName}{' '}
                           </Text>
                           {chatt.latestMessage && (
                              <Text fontSize="xs">
                                 <b>{chatt.latestMessage.sender.name} : </b>
                                 {chatt.latestMessage.content.length > 50
                                    ? chatt.latestMessage.content.substring(0, 51) + '...'
                                    : chatt.latestMessage.content}
                              </Text>
                           )}
                        </Box>
                     );
                  })}
               </Stack>
            ) : (
               <ChatLoading/>
            )}
         </Box>
      </Box>
   );
};

export default MyChats;
