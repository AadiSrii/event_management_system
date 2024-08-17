import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box as="main" padding="2rem">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
