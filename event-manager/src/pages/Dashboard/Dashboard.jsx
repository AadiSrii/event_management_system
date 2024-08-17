// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Button, Stack, Input, useToast } from '@chakra-ui/react';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const toast = useToast();

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/events', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setEvents(data);
    } catch (error) {
      toast({
        title: "Error Fetching Events",
        description: "Unable to fetch events.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/events/search?title=${search}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setEvents(data);
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to search events.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box padding="2rem" width="100%" maxW="md" margin="auto">
      <Heading as="h1" size="lg" mb="4" textAlign="center">Dashboard</Heading>
      <Input
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="4"
        width="40vw"
        height="5vh"
        marginLeft="20px"
      />
      <Button onClick={handleSearch} colorScheme="teal" mb="4">Search</Button>
      <Stack spacing={4}>
        {events.map((event) => (
          <Box key={event._id} padding="1rem" borderWidth="1px" borderRadius="5px">
            <Heading as="h3" size="md">{event.title}</Heading>
            <Text>Date: {event.date}</Text>
            <Text>Description: {event.description}</Text>
            <Button colorScheme="red" onClick={() => handleDelete(event._id)}>Delete</Button>
            <Button colorScheme="blue" onClick={() => handleEdit(event._id)}>Edit</Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Dashboard;
