import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="teal.500" color="white" padding="1rem" textAlign="center">
      <Text>&copy; 2024 Event Manager. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
