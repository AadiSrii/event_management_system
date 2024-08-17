import React, { useState } from 'react';
import axios from 'axios';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Feedback = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/feedback', { eventId, rating, comment }, { headers: { 'Authorization': `Bearer ${user.token}` } });
      setRating('');
      setComment('');
    } catch (err) {
      setError('Feedback submission failed');
    }
  };

  return (
    <Box padding="2rem">
      <Heading>Leave Feedback</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Rating</FormLabel>
          <Input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </FormControl>
        <FormControl isRequired marginTop="1rem">
          <FormLabel>Comment</FormLabel>
          <Input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </FormControl>
        <Button type="submit" marginTop="1rem">Submit Feedback</Button>
        {error && <Text color="red.500">{error}</Text>}
      </form>
    </Box>
  );
};

export default Feedback;
