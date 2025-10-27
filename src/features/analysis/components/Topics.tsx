import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconBookmarkFilled, IconFlameFilled } from "@tabler/icons-react";
import React from "react";

interface Topic {
  id: string;
  image: string;
  title: string;
  description: string;
  newsCount: number;
  type: string;
}

interface TopicsProps {
  topics: Topic[];
}

const TopicCard: React.FC<{
  topic: Topic;
  isLarge?: boolean;
}> = ({ topic, isLarge = false }) => {
  return (
    <Card
      bg="#000"
      color="white"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      height="100%"
      role="group"
      position="relative"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Box position="absolute" left={3} top={3} color="red.400" zIndex={2}>
        <IconFlameFilled size={18} />
      </Box>
      <IconButton
        size="sm"
        aria-label="Bookmark"
        icon={<IconBookmarkFilled size={16} />}
        position="absolute"
        right={3}
        top={3}
        zIndex={2}
        bg="whiteAlpha.200"
        backdropFilter="blur(10px)"
        color="white"
        border="1px solid"
        borderColor="whiteAlpha.300"
        _hover={{
          bg: "whiteAlpha.300",
        }}
      />
      <Box position="relative" height={isLarge ? "250px" : "180px"}>
        <Image
          src={topic.image}
          alt={topic.title}
          height="100%"
          width="100%"
          objectFit="cover"
          transition="all 0.3s ease"
          opacity={0.5}
          _groupHover={{
            opacity: 1,
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-t, #000, rgba(0,0,0,0.95), rgba(0,0,0,0.8), rgba(0,0,0,0.5), transparent)"
        />
      </Box>
      <CardBody p={4} mt={isLarge ? -16 : -12} position="relative" zIndex={1}>
        <Flex justify="space-between" align="flex-start" mb={2}>
          <Heading
            size={isLarge ? "md" : "sm"}
            flex="1"
            letterSpacing="tight"
            color="white"
            noOfLines={2}
          >
            {topic.title}
          </Heading>
        </Flex>
        <Text
          color="whiteAlpha.700"
          fontSize="sm"
          mb={2}
          noOfLines={isLarge ? 3 : 2}
        >
          {topic.description}
        </Text>
        <Flex justify="space-between" align="center">
          <Text fontSize="xs" color="whiteAlpha.600" fontWeight="medium">
            {topic.newsCount} {topic.newsCount === 1 ? "noticia" : "noticias"}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.600">
            13 Junio
          </Text>
        </Flex>
      </CardBody>
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        width="120px"
        height="120px"
        bg="whiteAlpha.100"
        borderRadius="full"
        filter="blur(40px)"
      />
    </Card>
  );
};

const Topics: React.FC<TopicsProps> = ({ topics }) => {
  return (
    <VStack align="start">
      <Heading size="md" mb={4}>
        Temas destacados
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={3}
        width="100%"
      >
        {topics.length > 0 && (
          <Box gridColumn={{ base: "span 1", md: "span 2" }}>
            <TopicCard topic={topics[0]} isLarge={true} />
          </Box>
        )}
        {topics.slice(1).map((topic) => (
          <Box key={topic.id} gridColumn="span 1">
            <TopicCard topic={topic} />
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

export default Topics;
