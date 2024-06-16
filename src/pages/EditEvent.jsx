import { useState, useEffect } from 'react';
import { Container, VStack, Input, Button, Text, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useEvent, useUpdateEvent, useVenues } from "../integrations/supabase/index.js";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { session } = useSupabaseAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: event, isLoading } = useEvent(id);
  const { data: venues } = useVenues();
  const updateEvent = useUpdateEvent();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        date: event.date || '',
        venue: event.venue || ''
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEvent.mutateAsync({ id, ...formData });
    alert('Event updated successfully!');
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Text fontSize="4xl" fontWeight="bold">Edit Event</Text>
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
        <Button type="submit" colorScheme="blue">Save</Button>
      </VStack>
    </Container>
  );
};

export default EditEvent;