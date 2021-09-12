import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Heading,
  VStack,
  Box,
  Button,
  Text,
  Link
} from '@chakra-ui/react';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleFormSubmit = e => {
    e.preventDefault();

    setUserData({email: '', password: ''});
  }

  return (
    <Center h='100vh'>
      <VStack>
        <Heading as='h1' mb='2' color='gray.600'>SR Social</Heading>
        <Box
          border='1px solid'
          borderColor='gray.300'
          borderRadius='5px'
          p='4'
          w='100%'
          minW='320px'
          as='form'
        >
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='text' name='email' autoComplete='off' value={userData.email} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' name='password' value={userData.password} onChange={handleInputChange} />
          </FormControl>
          <Button type='submit' mt='5' colorScheme='blue' onClick={handleFormSubmit}>Login</Button>
        </Box>
        <Text>
          Don't have an account? Click <Link href='/register' color='blue' textDecoration='underline' border='none' _active={{border: 'none'}}>here</Link>
        </Text>
      </VStack>
    </Center>
  )
}

export default Login;