import { Avatar, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useAuthenticatedUser } from "@/shared/hooks";

export default function UserInformation() {
  const { user, profile } = useAuthenticatedUser();

  const userName = profile?.name || user?.user_metadata?.name;
  const userEmail = user?.email;

  return (
    <HStack gap={5}>
      <Box bg="transparent" p="3px" borderRadius="2xl">
        <Avatar size="md" src={user?.user_metadata?.avatar_url} />
      </Box>
      <Stack gap={0}>
        <Heading size="lg">{userName || userEmail}</Heading>
        <Text color="gray.500">Your personal account</Text>
      </Stack>
    </HStack>
  );
}
