import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const HomePage = () => {
   return (
      <Container maxW={'xl'} centerContent>
         <Box
            display="flex"
            justifyContent={'center'}
            p={3}
            bg={'white'}
            width={'100%'}
            m="40px 0 15px"
            borderRadius={'lg'}
            borderWidth={'1px'}
         >
            <Text fontSize={'4xl'} fontStyle={'Work sans'} color="black">
               Talk A live
            </Text>
         </Box>

         <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs variant="soft-rounded" >
               <TabList mb="1em">
                  <Tab width={"50%"}>Login</Tab>
                  <Tab width={"50%"}>Sign Up</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel>
                    <Login/>
                  </TabPanel>
                  <TabPanel>
                <Signup/>
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </Box>
      </Container>
   );
};

export default HomePage;
