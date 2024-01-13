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
import { RootState } from '../../store';

const GroupChatModal = ({ children }: any) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [groupChatName, setGroupChatName] = useState<any>();
   const [selectedUsers, setSelectedUsers] = useState<any>([]);
   const [search, setSearch] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [loading, setLoading] = useState(false);
   const toast = useToast();

   const { auth, chat, selectedChat } = useAppSelector((state: RootState) => state);
   const user = auth.user;
   const chatData = chat.chat;

   const handleGroup = (userToAdd: any) => {};

   const handleSearch = async (query: any) => {};

   const handleDelete = (delUser: any) => {
      setSelectedUsers(selectedUsers.filter((sel: { _id: any }) => sel._id !== delUser._id));
   };

   const handleSubmit = async () => {};

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
