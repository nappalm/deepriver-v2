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
  useColorModeValue,
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
  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const textColor = useColorModeValue("gray.900", "white");
  const descColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const metaColor = useColorModeValue("gray.500", "whiteAlpha.600");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const iconBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const iconBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const iconHoverBg = useColorModeValue("gray.200", "whiteAlpha.300");
  const gradientBg = useColorModeValue(
    "linear(to-t, #ffffff, rgba(255,255,255,0.95), rgba(255,255,255,0.85), rgba(255,255,255,0.6), rgba(255,255,255,0.3), transparent)",
    "linear(to-t, #0A0A0A, rgba(10,10,10,0.95), rgba(10,10,10,0.85), rgba(10,10,10,0.6), rgba(10,10,10,0.3), transparent)"
  );

  return (
    <Card
      bg={bg}
      color={textColor}
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      height="100%"
      role="group"
      position="relative"
      border="1px solid"
      borderColor={borderColor}
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
        bg={iconBg}
        backdropFilter="blur(10px)"
        color={textColor}
        border="1px solid"
        borderColor={iconBorderColor}
        _hover={{
          bg: iconHoverBg,
        }}
      />
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        <Image
          src={topic.image}
          alt={topic.title}
          height="100%"
          width="100%"
          objectFit="cover"
          transition="all 0.3s ease"
          opacity={0.6}
          _groupHover={{
            opacity: 0.8,
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient={gradientBg}
        />
      </Box>
      <CardBody p={4} position="relative" zIndex={1} display="flex" flexDirection="column" justifyContent="flex-end" minHeight={isLarge ? "300px" : "220px"}>
        <Flex justify="space-between" align="flex-start" mb={2}>
          <Heading
            size={isLarge ? "md" : "sm"}
            flex="1"
            letterSpacing="tight"
            color={textColor}
            noOfLines={2}
          >
            {topic.title}
          </Heading>
        </Flex>
        <Text
          color={descColor}
          fontSize="sm"
          mb={2}
          noOfLines={isLarge ? 3 : 2}
        >
          {topic.description}
        </Text>
        <Flex justify="space-between" align="center">
          <Text fontSize="xs" color={metaColor} fontWeight="medium">
            {topic.newsCount} {topic.newsCount === 1 ? "noticia" : "noticias"}
          </Text>
          <Text fontSize="xs" color={metaColor}>
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
