import { Box, Button, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

const SideDrawer = () => {
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
               <Button variant="ghost">
                  <i className="fas fa-search"></i>
                  <Text display={{ base: 'none', md: 'flex' }} px={4}>
                     Search User
                  </Text>
               </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
               Talk-A-Tive
            </Text>
         </Box>
      </>
   );
};

export default SideDrawer;
