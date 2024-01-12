import {
   Avatar,
   Box,
   Button,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Input,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   Spinner,
   Text,
   Tooltip,
   useDisclosure,
   useToast,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import ProfileModal from './ProfileModel';
import { setUnAuth } from '../../store/reducers/auth';
import { useState } from 'react';
import ChatLoading from '../ChatLoading';
import UserListItem from '../useAvatar/UserListitem';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/api';
import { selectChat } from '../../store/reducers/chat/selectedChat';

export interface ISearchData {
   createdAt: string;
   email: string;
   isAdmin: boolean;
   name: string;
   pic: string;
   _id: string;
   updatedAt: string;
}

const SideDrawer = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [search, setSearch] = useState('');
   const [searchResult, setSearchResult] = useState<ISearchData[]>([]);
   const [loadingChat, setLoadingChat] = useState(false);

   const { isOpen, onOpen, onClose } = useDisclosure();

   const { user } = useAppSelector((state: RootState) => state.auth);
   const token = useAppSelector((state: RootState) => state.auth.token);
   const dispatch = useAppDispatch();
   const toast = useToast();

   const logoutHandler = () => {
      dispatch(setUnAuth());
   };

   const handleSearch = async () => {
      if (!search) {
         toast({
            title: 'Please Enter something in search',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-left',
         });
         return;
      }

      try {
         setLoading(true);

         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.get(`${BACKEND_URL}user?search=${search}`, config);
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
         setLoading(false);
      }
   };

   const accessChat = async (id: string) => {
      try {
         setLoadingChat(true);
         const config = {
            headers: {
               'Content-type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.post(`${BACKEND_URL}chat`, { userId :id }, config);

         dispatch(selectChat(data));
         setLoadingChat(false);
         onClose();
      } catch (error: any) {
         toast({
            title: 'Error fetching the chat',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
         });
      }
   };

   console.log("result " ,searchResult)
   return (
      <>
         <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
         >
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
               <Button variant="ghost" onClick={onOpen}>
                  <i className="fas fa-search"></i>
                  <Text display={{ base: 'none', md: 'flex' }} px={4}>
                     Search User
                  </Text>
               </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
               Talk-A-Tive
            </Text>
            <div>
               <Menu>
                  <MenuButton p={1}>
                     <BellIcon fontSize="2xl" m={1} />
                  </MenuButton>
                  <MenuList>
                     <MenuItem></MenuItem>
                  </MenuList>
               </Menu>
               <Menu>
                  <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                     <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic} />
                  </MenuButton>
                  <MenuList>
                     <ProfileModal user={user}>
                        <MenuItem>My Profile</MenuItem>{' '}
                     </ProfileModal>
                     <MenuDivider />
                     <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
               </Menu>
            </div>
         </Box>

         <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
               <DrawerBody>
                  <Box display="flex" pb={2}>
                     <Input
                        placeholder="Search by name or email"
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                     />
                     <Button onClick={handleSearch}>Go</Button>
                  </Box>
                  {loading ? (
                     <ChatLoading />
                  ) : (
                     searchResult?.map((userdata: ISearchData) => (
                        <UserListItem
                           key={userdata._id}
                           user={userdata}
                           handleFunction={() => accessChat(userdata._id)}
                        />
                     ))
                  )}
                  {loadingChat && <Spinner ml="auto" display="flex" />}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default SideDrawer;
