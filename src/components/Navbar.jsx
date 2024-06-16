import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { session, logout } = useSupabaseAuth();
  const username = session?.user?.user_metadata?.username || "Guest";

  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex align="center">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Bobo
        </Text>
        <Spacer />
        <Text fontSize="lg" color="white" mr={4}>
          {username}
        </Text>
        {session ? (
          <Button colorScheme="teal" variant="outline" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button as={Link} to="/login" colorScheme="teal" variant="outline">
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;