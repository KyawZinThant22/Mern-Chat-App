import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
   const [email, setEmail] = useState<string>('');
   const [show, setShow] = useState<boolean>(false);

   const submitHandler = () => {};
   return (
      <VStack spacing={'5px'}>
         <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
         </FormControl>
         <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
               <Input type={show ? 'text' : 'password'} placeholder="Enter your password" />
               <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                     {show ? 'Hide' : 'Show'}
                  </Button>
               </InputRightElement>
            </InputGroup>
         </FormControl>

         <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
            Login
         </Button>
      </VStack>
   );
};

export default Login;
