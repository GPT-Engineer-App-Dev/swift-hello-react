import { Container, Text, VStack, Box, Button, Flex } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: events, isLoading } = useEvents();
  const { session } = useSupabaseAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Events</Text>
        {events.map(event => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="2xl">{event.name}</Text>
              {session && (
                <Button as={Link} to={`/edit-event/${event.id}`} colorScheme="blue">Edit</Button>
              )}
            </Flex>
            <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
            <Text>Venue: {event.venue}</Text>
          </Box>
        ))}
        {session && (
          <Button as={Link} to="/create-event" colorScheme="green">Create Event</Button>
        )}
      </VStack>
    </Container>
  );
};

export default Index;