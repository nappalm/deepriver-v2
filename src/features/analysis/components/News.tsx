import {
  Badge,
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
import { IconBookmarkFilled } from "@tabler/icons-react";
import { NewsItem, NewsProps } from "../utils/types";

const NewsCard = ({
  item,
  onClick,
}: {
  item: NewsItem;
  onClick?: () => void;
}) => {
  const colors = {
    text: useColorModeValue("gray.900", "white"),
    desc: useColorModeValue("gray.600", "whiteAlpha.700"),
    meta: useColorModeValue("gray.500", "whiteAlpha.600"),
    border: useColorModeValue("gray.200", "whiteAlpha.200"),
    iconBg: useColorModeValue("gray.100", "whiteAlpha.200"),
    iconBorder: useColorModeValue("gray.300", "whiteAlpha.300"),
    iconHover: useColorModeValue("gray.200", "whiteAlpha.300"),
  };

  return (
    <Card
      variant="elevated"
      overflow="hidden"
      position="relative"
      cursor="pointer"
      role="group"
      onClick={onClick}
    >
      <CardBody p={2}>
        <Flex gap={2} align="flex-start">
          <Box flex={1} minW={0}>
            <Flex align="center" gap={1.5} mb={1}>
              <Badge variant="bordered" flexShrink={0}>
                {item.type}
              </Badge>
              {item.date && (
                <Text fontSize="2xs" color={colors.meta} flexShrink={0}>
                  {item.date}
                </Text>
              )}
            </Flex>
            <Heading size="sm" mb={1} noOfLines={1} fontSize="sm">
              {item.title}
            </Heading>
            <Text color={colors.desc} fontSize="2xs" noOfLines={1}>
              {item.description}
            </Text>
          </Box>
          <Box
            w="45px"
            h="45px"
            borderRadius="md"
            overflow="hidden"
            flexShrink={0}
            border="1px solid"
            borderColor={colors.border}
          >
            <Image
              src={item.image}
              alt={item.title}
              w="100%"
              h="100%"
              objectFit="cover"
              opacity={0.7}
              transition="all 0.2s ease"
              _groupHover={{ transform: "scale(1.1)", opacity: 1 }}
            />
          </Box>
          <IconButton
            size="xs"
            aria-label="Bookmark"
            icon={<IconBookmarkFilled size={12} />}
            position="absolute"
            right={1.5}
            top={1.5}
            zIndex={2}
            bg={colors.iconBg}
            backdropFilter="blur(10px)"
            color={colors.text}
            border="1px solid"
            borderColor={colors.iconBorder}
            _hover={{ bg: colors.iconHover }}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

const News = ({ news, onNewsClick }: NewsProps) => (
  <VStack spacing={0} align="stretch">
    <Heading size="sm" mb={2}>
      Noticias
    </Heading>
    <VStack spacing={1.5} align="stretch">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} onClick={onNewsClick} />
      ))}
    </VStack>
  </VStack>
);

export default News;
