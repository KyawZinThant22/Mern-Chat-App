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
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { RootState, dispatch } from '../../store';
import { BACKEND_URL } from '../../utils/api';
import UserListItem from '../useAvatar/UserListitem';
import UserBadgeItem from '../useAvatar/UserBadgeItem';
import { addChat } from '../../store/reducers/chat';

const GroupChatModal = ({ children }: any) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [groupChatName, setGroupChatName] = useState<any>();
   const [selectedUsers, setSelectedUsers] = useState<any>([]);
   const [searchResult, setSearchResult] = useState([]);
   const [loading, setLoading] = useState(false);
   const toast = useToast();

   const { auth, chat } = useAppSelector((state: RootState) => state);
   const chatData = chat.chat;

   const handleGroup = (userToAdd: any) => {
      if (selectedUsers.includes(userToAdd)) {
         toast({
            title: 'User already added',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top',
         });
         return;
      }
      setSelectedUsers([...selectedUsers, userToAdd]);
   };

   const handleSearch = async (query: string) => {
      if (!query) {
         return;
      }
      try {
         setLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         };
         const { data } = await axios.get(`${BACKEND_URL}user?search=${query}`, config);
         console.log(data);
         setLoading(false);
         setSearchResult(data);
      } catch (error) {
         toast({
            title: 'Error Occured!',
            description: 'Failed to Load the Search Results',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
         });
      }
   };

   const handleDelete = (delUser: any) => {
      setSelectedUsers(selectedUsers.filter((sel: { _id: any }) => sel._id !== delUser._id));
   };

   const handleSubmit = async () => {
    if(!groupChatName && !selectedUsers){
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const {data} = await axios.post(`${BACKEND_URL}chat/group`,{
        name : groupChatName,
        users: JSON.stringify(selectedUsers.map((item:any)=>item._id))
      },config)
      dispatch(addChat([data,...chatData]))
      onClose()
    }catch(error:any){
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
   };

   console.log(selectedUsers);

   return (
      <>
         <span onClick={onOpen}>{children}</span>

         <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader
                  fontSize="35px"
                  fontFamily="Work sans"
                  display="flex"
                  justifyContent="center"
               >
                  Create Group Chat
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody display="flex" flexDir="column" alignItems="center">
                  <FormControl>
                     <Input
                        placeholder="Chat Name"
                        mb={3}
                        onChange={(e) => setGroupChatName(e.target.value)}
                     />
                  </FormControl>
                  <FormControl>
                     <Input
                        placeholder="Add Users eg: John, Piyush, Jane"
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                     />
                  </FormControl>
                  <Box w="100%" display="flex" flexWrap="wrap">
                     {selectedUsers.map((us: any) => (
                        <UserBadgeItem
                           key={us._id}
                           user={us}
                           handleFunction={() => handleDelete(us)}
                        />
                     ))}
                  </Box>
                  {loading ? (
                     // <ChatLoading />
                     <div>Loading...</div>
                  ) : (
                     searchResult
                        ?.slice(0, 4)
                        .map((user: any) => (
                           <UserListItem
                              key={user._id}
                              user={user}
                              handleFunction={() => handleGroup(user)}
                           />
                        ))
                  )}
               </ModalBody>

               <ModalFooter>
                  <Button onClick={handleSubmit} colorScheme="blue">
                     Create Chat
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default GroupChatModal;
