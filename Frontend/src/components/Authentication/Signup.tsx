import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const Signup = () => {
   const [name, setName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [show, setShow] = useState(false);
   const [password, setPassword] = useState<string>('');

   const postDetails = (pics: any) => {};

   const submitHandler = () => {};

   return (
      <VStack spacing="5px">
         <FormControl isRequired id="first-name">
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
         </FormControl>

         <FormControl isRequired id="email">
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
         </FormControl>

         <FormControl isRequired id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
               <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
               />
               <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                     {show ? 'Hide' : 'Show'}
                  </Button>
               </InputRightElement>
            </InputGroup>
         </FormControl>
         <FormControl id="photo">
            <FormLabel>Upload your picture</FormLabel>
            <Input
               type="file"
               accept="image/*"
               p={1.5}
               onChange={(e) => postDetails(e.target.value[0])}
            />
         </FormControl>
         <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
            Sign Up
         </Button>
      </VStack>
   );
};

export default Signup;
