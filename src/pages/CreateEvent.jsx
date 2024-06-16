import { useState } from 'react';
import { Container, VStack, Input, Button, Text, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useAddEvent, useVenues } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const { data: venues } = useVenues();
  const addEvent = useAddEvent();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEvent.mutateAsync(formData);
    alert('Event created successfully!');
    navigate('/');
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Text fontSize="4xl" fontWeight="bold">Create Event</Text>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="date">
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={formData.date} onChange={handleChange} />
        </FormControl>
        <FormControl id="venue">
          <FormLabel>Venue</FormLabel>
          <Select name="venue" value={formData.venue} onChange={handleChange}>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="green">Create</Button>
      </VStack>
    </Container>
  );
};

export default CreateEvent;