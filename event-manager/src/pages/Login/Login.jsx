import React, { useState } from 'react';
import axios from 'axios';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, VStack, Container, useToast, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="lg" centerContent margin="auto">
      <Box
        padding="2rem"
        borderWidth="1px"
        borderRadius="5px"
        boxShadow="lg"
        bg="white"
        width="100%"
        maxW="md"
        margin="auto"
      >
        <Heading as="h1" size="lg" mb="4" textAlign="center" color="black">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel color="red">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                size="lg"
                color="black"
                bg="white"
                height="40px"
                width="98%"
                borderRadius="5px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="red">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="lg"
                color="black"
                bg="white"
                height="40px"
                width="98%"
                borderRadius="5px"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              variant="solid"
              width="full"
            >
              Login
            </Button>
            {error && <Text color="red.500" textAlign="center">{error}</Text>}
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
