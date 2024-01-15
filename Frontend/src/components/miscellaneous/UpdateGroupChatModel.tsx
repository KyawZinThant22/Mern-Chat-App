import { ViewIcon } from '@chakra-ui/icons';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   useDisclosure,
   FormControl,
   Input,
   useToast,
   Box,
   Spinner,
   IconButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState, dispatch } from '../../store';
import UserBadgeItem from '../useAvatar/UserBadgeItem';
import UserListItem from '../useAvatar/UserListitem';
import { BACKEND_URL } from '../../utils/api';
import { selectChat } from '../../store/reducers/chat/selectedChat';

interface IUpdateGroupModel {
   fetchMessages: any;
   fetchAgain: boolean;
   setFetchAgain: Function;
}

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }: IUpdateGroupModel) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [groupChatName, setGroupChatName] = useState<string>();
   const [search, setSearch] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [loading, setLoading] = useState(false);
   const [renameloading, setRenameLoading] = useState(false);
   const toast = useToast();
  const dispatch = useAppDispatch()
   const { user } = useAppSelector((state: RootState) => state.auth);
   const { token } = useAppSelector((state: RootState) => state.auth);

   const { selectedChat } = useAppSelector((state: RootState) => state.selectedChat);

   const handleSearch = async (query: any) => {};

   const handleRename = async () => {
      if (!groupChatName) return;
      try {
         setRenameLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.put(
            `${BACKEND_URL}chat/group/rename`,
            {
               chatId: selectedChat._id,
               chatName: groupChatName,
            },
            config,
         );

         dispatch(selectChat(data))
         setFetchAgain(!fetchAgain)
        setRenameLoading(false)
      } catch (error: any) {
         toast({
            title: 'Error Occured!',
            description: error.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });
         setRenameLoading(false);
      }
   };

   const handleAddUser = async (user1: any) => {};

   const handleRemove = async (user1: any) => {};

   return (
      <>
         <IconButton
            aria-label="btn"
            display={{ base: 'flex' }}
            icon={<ViewIcon />}
            onClick={onOpen}
         />

         <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader
                  fontSize="35px"
                  fontFamily="Work sans"
                  display="flex"
                  justifyContent="center"
               >
                  {selectedChat.chatName}
               </ModalHeader>

               <ModalCloseButton />
               <ModalBody display="flex" flexDir="column" alignItems="center">
                  <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                     {selectedChat.users.map((u: any) => (
                        <UserBadgeItem
                           key={u._id}
                           user={u}
                           admin={selectedChat.groupAdmin}
                           handleFunction={() => handleRemove(u)}
                        />
                     ))}
                  </Box>
                  <FormControl display="flex">
                     <Input
                        placeholder="Chat Name"
                        mb={3}
                        value={groupChatName}
                        onChange={(e) => setGroupChatName(e.target.value)}
                     />
                     <Button
                        variant="solid"
                        colorScheme="teal"
                        ml={1}
                        isLoading={renameloading}
                        onClick={handleRename}
                     >
                        Update
                     </Button>
                  </FormControl>
                  <FormControl>
                     <Input
                        placeholder="Add User to group"
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                     />
                  </FormControl>

                  {loading ? (
                     <Spinner size="lg" />
                  ) : (
                     searchResult?.map((userD: any) => (
                        <UserListItem
                           key={userD._id}
                           user={user}
                           handleFunction={() => handleAddUser(userD)}
                        />
                     ))
                  )}
               </ModalBody>
               <ModalFooter>
                  <Button onClick={() => handleRemove(user)} colorScheme="red">
                     Leave Group
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default UpdateGroupChatModal;
