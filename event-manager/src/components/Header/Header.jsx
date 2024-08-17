import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [showLogin, setShowLogin] = useState(true); // State to toggle between Login and Register

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = () => {
    // Handle login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Handle logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Flex as="header" bg="teal.500" color="white" padding="1rem" flexDirection="column" marginLeft="20px">
      <Heading size="lg" mb="1rem" textAlign="center">
        Event Manager
      </Heading>
      <Flex justify="center" padding="1rem">
        {isLoggedIn ? (
          <>
            <Link to="/events">
              <Button marginRight="1rem">Events</Button>
            </Link>
            <Link to="/dashboard">
              <Button marginRight="1rem">Dashboard</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            {showLogin ? (
              <>
                <Link to="/login">
                  <Button marginRight="1rem" onClick={handleLogin}>
                    Login
                  </Button>
                </Link>
                <Button onClick={handleToggle}>Switch to Register</Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button marginRight="1rem" onClick={handleLogin}>
                    Register
                  </Button>
                </Link>
                <Button onClick={handleToggle}>Switch to Login</Button>
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
