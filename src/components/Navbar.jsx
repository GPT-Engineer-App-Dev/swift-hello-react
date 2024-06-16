import { Box, Flex, Text, Button, Spacer, Avatar } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { Link } from "react-router-dom";

import { useProfile } from "../integrations/supabase/index.js";

const Navbar = () => {
  const { session, logout } = useSupabaseAuth();
  const userId = session?.user?.id;
  const { data: profile } = useProfile(userId);
  const username = profile?.username || "Guest";
  const avatarUrl = profile?.avatar_url || "";

  return (
    <Box bg="green.500" px={4} py={2}>
      <Flex align="center">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Bobo
        </Text>
        <Spacer />
        {avatarUrl && <Avatar src={avatarUrl} size="sm" mr={4} />}
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