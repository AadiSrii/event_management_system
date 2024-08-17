import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box padding="2rem">
      <Heading>Welcome to Event Manager</Heading>
      <Box marginTop="1rem">
        <p>Find and manage your events with ease!</p>
      </Box>
    </Box>
  );
};

export default Home;
