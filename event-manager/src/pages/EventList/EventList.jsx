import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Button, Text, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const res = await axios.get('/api/events', {
          headers: {
            'Authorization': `Bearer ${token}` // Include token in the Authorization header
          }
        });
        setEvents(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
        // Optionally handle errors here, e.g., show an error message to the user
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box padding="2rem">
      <Heading mb="1rem">Event List</Heading>

      <Button as={Link} to="/create-event" colorScheme="teal">Create New Event</Button>

      {events.length > 0 ? (
        events.map((event) => (
          <Box key={event._id} border="1px solid #ddd" padding="1rem" marginBottom="1rem">
            <Heading size="md">{event.name}</Heading>
            <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
            <Link to={`/events/${event._id}`}>
              <Button mt="1rem" colorScheme="blue">View Details</Button>
            </Link>
          </Box>
        ))
      ) : (
        <Text>No events available.</Text>
      )}
    </Box>
  );
};

export default EventList;
