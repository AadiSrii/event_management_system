import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Button, Spinner, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`/api/events/${id}`);
      setEvent(res.data);
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    await axios.post('/api/registration', { eventId: id }, { headers: { 'Authorization': `Bearer ${user.token}` } });
    setRegistering(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box padding="2rem">
      <Heading>{event.name}</Heading>
      <Text>Date: {event.date}</Text>
      <Text>Time: {event.time}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Description: {event.description}</Text>
      {user && (
        <Button onClick={handleRegister} isLoading={registering}>Register</Button>
      )}
    </Box>
  );
};

export default EventDetails;
