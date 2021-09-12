import React from 'react';
import { Center, Heading, Text, VStack } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Center h='100vh'>
      <VStack>
        <Text fontSize='2xl' fontWeight='bold' color='gray.400' mb='2'>SR Social</Text>
        <Heading as='h1' size='2xl' color='gray.400'>
          404 | Not Found
        </Heading>
      </VStack>
    </Center>
  )
}

export default NotFound;