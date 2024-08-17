import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, VStack, Container, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decodedToken = jwt_decode(token);
//         console.log('Decoded Token:', decodedToken);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     } else {
//       console.log('No token found');
//     }
//   }, []); 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    console.log('Authorization Token:', token); // Log the token to verify
  
    try {
      await axios.post('http://localhost:5000/api/events/', 
        { title, date, description }, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      toast({
        title: "Event Created",
        description: "Your event has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard'); // Redirect to the dashboard or any other page after creation
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Failed to create event');
      toast({
        title: "Event Creation Failed",
        description: "There was an error creating the event. Please try again.",
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
          Create Event
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel color="black">Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                size="lg"
                color="black"
                bg="white"
                height="40px"
                width="98%"
                borderRadius="5px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="black">Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                size="lg"
                color="black"
                bg="white"
                height="40px"
                width="98%"
                borderRadius="5px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="black">Description</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
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
              Create Event
            </Button>
            {error && <Text color="red.500" textAlign="center">{error}</Text>}
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default CreateEvent;
