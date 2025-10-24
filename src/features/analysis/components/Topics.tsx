import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
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

const Topics: React.FC<TopicsProps> = ({ topics }) => {
  return (
    <VStack align="start">
      <Heading size="md" mb={2}>
        Temas destacados
      </Heading>
      <SimpleGrid columns={2} spacing={0}>
        {topics.map((topic) => (
          <Card
            key={topic.id}
            borderRadius={0}
            borderStyle="dashed"
            mr="-2px"
            overflow="hidden"
            cursor="pointer"
            transition="all 0.3s ease"
          >
            <Box
              position="absolute"
              left={2}
              top={2}
              color="red.500"
              zIndex={1}
            >
              <IconFlameFilled size={24} />
            </Box>
            <IconButton
              size="sm"
              aria-label="Bookmark"
              icon={<IconBookmarkFilled size={16} />}
              position="absolute"
              right={2}
              top={2}
              zIndex={1}
            />
            <Box overflow="hidden" height="150px">
              <Image
                opacity={0.4}
                src={topic.image}
                alt={topic.title}
                height="150px"
                width="100%"
                objectFit="cover"
                transition="transform 0.3s ease"
                _groupHover={{
                  transform: "scale(1.1)",
                }}
                sx={{
                  "div:hover > &": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Box>
            <CardBody p={3}>
              <Flex justify="space-between" align="flex-start" mb={2}>
                <Heading size="md" flex="1" letterSpacing="tight">
                  {topic.title}
                </Heading>
                <Text>13 Junio</Text>
              </Flex>
              <Text color="gray.500" fontSize="sm" mb={2} noOfLines={2}>
                {topic.description}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {topic.newsCount}{" "}
                {topic.newsCount === 1 ? "noticia" : "noticias"}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Topics;
