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

import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
   const [name, setName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [show, setShow] = useState(false);
   const [password, setPassword] = useState<string>('');
   const [loading, setloading] = useState<boolean>(false);
   const [pic, setPic] = useState<string>('');
   const [picLoading, setPicLoading] = useState<boolean>(false);
   const toast = useToast();
   const navigate = useNavigate()


   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files && files.length > 0) {
         postDetails(files[0]);
      }
   };

   const postDetails = (pic: any) => {
      console.log(pic);
      setloading(true);
      if (pic == undefined) {
         toast({
            title: 'Please select an image',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });
         return;
      }

      if (pic.type == 'image/jpeg' || pic.type == 'image/png') {
         const data = new FormData();
         data.append('file', pic);
         data.append('upload_preset', 'Mern-Chat-App');
         data.append('cloud_name', 'df3jn4uqd');
         fetch('https://api.cloudinary.com/v1_1/df3jn4uqd/image/upload', {
            method: 'post',
            body: data,
         })
            .then((res) => res.json())
            .then((data) => {
               setPic(data.url.toString());
               console.log(data.url.toString());
               setloading(false);
            })
            .catch((err) => {
               console.log(err);
               setloading(false);
            });
      } else {
         toast({
            title: 'Please select an image',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });
         setloading(false);
         return;
      }
   };

   const submitHandler = async () => {
      setPicLoading(true);
      if (!name || !email || !password) {
         toast({
            title: 'Please Fill all the Feilds',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });
         setPicLoading(false);
         return;
      }

      try {
         const config = {
            headers: {
               'Content-type': 'application/json',
            },
         };
         const { data } = await axios.post(
            'http://localhost:8080/api/user',
            {
               name,
               email,
               password,
               pic,
            },
            config,
         );
         console.log(data);
         toast({
            title: 'Registration Successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
         });
         localStorage.setItem("userInfo", JSON.stringify(data));
         setPicLoading(false);
         navigate("/chat")
      } catch (err) {
         console.log(err);
      }
   };

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
            <Input type="file" accept="image/*" p={1.5} onChange={handleFileChange} />
         </FormControl>
         <Button
            isLoading={loading}
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
         >
            Sign Up
         </Button>
      </VStack>
   );
};

export default Signup;
