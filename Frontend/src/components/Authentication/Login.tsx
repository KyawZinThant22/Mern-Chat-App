import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   VStack,
   useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser, setUnAuth } from '../../store/reducers/auth';
import { BACKEND_URL, api } from '../../utils/api';

const Login = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [show, setShow] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const toast = useToast();
   const navigate = useNavigate();

   const dispatch = useDispatch();

   const getGuestInfo = () => {
      setEmail('guestUser@gmail.com');
      setPassword('guestpassword23');
   };

   const reset = () => {
      setEmail('');
      setPassword('');
   };

   const submitHandler = async () => {
      setLoading(true);

      if (!email || !password) {
         toast({
            title: 'Please Fill all the Feilds',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });
         reset();
         setLoading(false);
         return;
      }

      try {
         const config = {
            headers: {
               'Content-type': 'application/json',
            },
         };

         const { data } = await api.post(`${BACKEND_URL}user/login`, { email, password }, config);

         toast({
            title: 'Login Successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });

         localStorage.setItem('token', data.token);
         dispatch(
            setAuthUser({
               user: {
                  id: data._id,
                  name: data.name,
                  email: data.email,
                  pic: data.pic,
               },
               token: data.token,
            }),
         );

         setLoading(false);
         navigate('/chats');
      } catch (err: any) {
         toast({
            title: 'Error Occured!',
            description: err.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });
         reset();
         dispatch(setUnAuth());
         setLoading(false);
      }
   };
   return (
      <VStack spacing={'5px'}>
         <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
               value={email}
               placeholder="Enter your email"
               onChange={(e) => setEmail(e.target.value)}
            />
         </FormControl>
         <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
               <Input
                  value={password}
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
               />
               <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                     {show ? 'Hide' : 'Show'}
                  </Button>
               </InputRightElement>
            </InputGroup>
         </FormControl>

         <Button
            isLoading={loading}
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
         >
            Login
         </Button>

         <Button
            isLoading={loading}
            colorScheme="red"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={getGuestInfo}
         >
            Get Guest User credential
         </Button>
      </VStack>
   );
};

export default Login;
