import { useState, useEffect } from 'react';
import { Container, VStack, Input, Button, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useProfile, useUpdateProfile } from "../integrations/supabase/index.js";

const EditProfile = () => {
  const { session } = useSupabaseAuth();
  const userId = session?.user?.id;
  const { data: profile, isLoading } = useProfile(userId);
  const updateProfile = useUpdateProfile();

  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    avatar_url: '',
    website: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        full_name: profile.full_name || '',
        avatar_url: profile.avatar_url || '',
        website: profile.website || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile.mutateAsync({ id: userId, ...formData });
    alert('Profile updated successfully!');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Text fontSize="4xl" fontWeight="bold">Edit Profile</Text>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input name="username" value={formData.username} onChange={handleChange} />
        </FormControl>
        <FormControl id="full_name">
          <FormLabel>Full Name</FormLabel>
          <Input name="full_name" value={formData.full_name} onChange={handleChange} />
        </FormControl>
        <FormControl id="avatar_url">
          <FormLabel>Avatar URL</FormLabel>
          <Input name="avatar_url" value={formData.avatar_url} onChange={handleChange} />
        </FormControl>
        <FormControl id="website">
          <FormLabel>Website</FormLabel>
          <Input name="website" value={formData.website} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Save</Button>
      </VStack>
    </Container>
  );
};

export default EditProfile;