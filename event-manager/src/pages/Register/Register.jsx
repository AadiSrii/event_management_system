import React, { useState } from 'react';
import axios from 'axios';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding="1rem"
      bg="gray.50"
      marginTop="-150px"
      marginBottom="-100px"
    >
      <Box 
        width="40vw"
        padding="2rem"
        boxShadow="md"
        bg="white"
        borderRadius="8px"
      >
        <Heading as="h1" size="lg" marginBottom="1.5rem" textAlign="center" color="black" >
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired marginLeft="10%">
            <FormLabel color="red">Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outline"
              focusBorderColor="blue.400"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
              width="30vw"
              height="4vh"
            />
          </FormControl>
          <FormControl isRequired marginTop="0.5rem" marginLeft="10%">
            <FormLabel color="red">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outline"
              focusBorderColor="blue.400"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
              width="30vw"
              height="4vh"
            />
          </FormControl>
          <FormControl isRequired marginTop="0.5rem" marginLeft="10%">
            <FormLabel color="red">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outline"
              focusBorderColor="blue.400"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
              width="30vw"
              height="4vh"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            marginTop="1rem"
            width="31vw"
              height="6vh"
              marginLeft="10%"
          >
            Register
          </Button>
          {error && (
            <Text color="red.500" textAlign="center" marginTop="1rem">
              {error}
            </Text>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Register;
