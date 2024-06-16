import { useState } from "react";
import { Container, Text, VStack, Button, HStack, Box, Input, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent, useVenues } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: venues, isLoading: venuesLoading } = useVenues();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", venue: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    await addEvent.mutateAsync(newEvent);
    setNewEvent({ name: "", date: "", venue: "" });
  };

  const handleUpdateEvent = async () => {
    await updateEvent.mutateAsync(editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteEvent = async (id) => {
    await deleteEvent.mutateAsync(id);
  };

  if (eventsLoading || venuesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Events</Text>
        {events.map((event) => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            {editingEvent && editingEvent.id === event.id ? (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input name="name" value={editingEvent.name} onChange={handleEditChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input type="date" name="date" value={editingEvent.date} onChange={handleEditChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Venue</FormLabel>
                  <Select name="venue" value={editingEvent.venue} onChange={handleEditChange}>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>{venue.name}</option>
                    ))}
                  </Select>
                </FormControl>
                <HStack spacing={4}>
                  <Button colorScheme="blue" onClick={handleUpdateEvent}>Save</Button>
                  <Button colorScheme="gray" onClick={() => setEditingEvent(null)}>Cancel</Button>
                </HStack>
              </VStack>
            ) : (
              <HStack spacing={4} justifyContent="space-between">
                <Box>
                  <Text fontSize="xl" fontWeight="bold">{event.name}</Text>
                  <Text>{event.date}</Text>
                  <Text>{venues.find((venue) => venue.id === event.venue)?.name}</Text>
                </Box>
                <HStack spacing={2}>
                  <Button colorScheme="yellow" onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </HStack>
              </HStack>
            )}
          </Box>
        ))}
        <VStack spacing={4} as="form" onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }}>
          <Text fontSize="2xl" fontWeight="bold">Add New Event</Text>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={newEvent.name} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={newEvent.date} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Venue</FormLabel>
            <Select name="venue" value={newEvent.venue} onChange={handleChange}>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>{venue.name}</option>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="blue">Add Event</Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;