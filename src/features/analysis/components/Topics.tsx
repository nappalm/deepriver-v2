import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconBookmarkFilled, IconFlameFilled } from "@tabler/icons-react";
import { Topic, TopicsProps } from "../utils/types";

const TopicCard = ({
  topic,
  isLarge = false,
  onClick,
}: {
  topic: Topic;
  isLarge?: boolean;
  onClick?: () => void;
}) => {
  const textColor = useColorModeValue("gray.900", "white");
  const descColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const metaColor = useColorModeValue("gray.500", "whiteAlpha.600");
  const iconBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const iconBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const iconHoverBg = useColorModeValue("gray.200", "whiteAlpha.300");
  const gradientBg = useColorModeValue(
    "linear(to-t, rgba(255,255,255,0.95), rgba(255,255,255,0.7), rgba(255,255,255,0.4), rgba(255,255,255,0.1), transparent)",
    "linear(to-t, rgba(10,10,10,0.95), rgba(10,10,10,0.7), rgba(10,10,10,0.4), rgba(10,10,10,0.1), transparent)",
  );

  return (
    <Card
      variant="elevated"
      overflow="hidden"
      cursor="pointer"
      height="100%"
      role="group"
      position="relative"
      onClick={onClick}
    >
      <Box position="absolute" left={1.5} top={1.5} color="red.400" zIndex={2}>
        <IconFlameFilled size={12} />
      </Box>
      <IconButton
        size="xs"
        aria-label="Bookmark"
        icon={<IconBookmarkFilled size={10} />}
        position="absolute"
        right={1.5}
        top={1.5}
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
          opacity={0.7}
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
          bgGradient={gradientBg}
        />
      </Box>
      <CardBody
        p={2}
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        minHeight={isLarge ? "140px" : "140px"}
      >
        <Flex justify="space-between" align="flex-start" mb={0.5}>
          <Heading
            size="xs"
            flex="1"
            letterSpacing="tight"
            color={textColor}
            noOfLines={2}
            fontSize={isLarge ? "sm" : "xs"}
          >
            {topic.title}
          </Heading>
        </Flex>
        <Text
          color={descColor}
          fontSize="xs"
          mb={0.5}
          noOfLines={1}
        >
          {topic.description}
        </Text>
        <Flex justify="space-between" align="center">
          <Text fontSize="2xs" color={metaColor} fontWeight="medium">
            {topic.newsCount} {topic.newsCount === 1 ? "noticia" : "noticias"}
          </Text>
          <Text fontSize="2xs" color={metaColor}>
            13 Jun
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

const Topics = ({ topics, onTopicClick }: TopicsProps) => (
  <VStack align="start" width="100%">
    <Heading size="sm" mb={2}>
      Temas destacados
    </Heading>
    <Box
      width="100%"
      overflowX="auto"
      css={{
        "&::-webkit-scrollbar": {
          height: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "rgba(255, 255, 255, 0.3)",
        },
      }}
    >
      <Flex gap={2} pb={2}>
        {topics.length > 0 && (
          <Box minW="240px" maxW="240px" h="140px">
            <TopicCard topic={topics[0]} isLarge={true} onClick={onTopicClick} />
          </Box>
        )}
        {topics.slice(1).map((topic) => (
          <Box key={topic.id} minW="200px" maxW="200px" h="140px">
            <TopicCard topic={topic} onClick={onTopicClick} />
          </Box>
        ))}
      </Flex>
    </Box>
  </VStack>
);

export default Topics;
