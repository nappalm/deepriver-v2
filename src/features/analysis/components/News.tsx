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
import React from "react";

interface NewsItem {
  id: string;
  image: string;
  title: string;
  description: string;
  newsCount: number;
  type: string;
  date?: string;
}

interface NewsProps {
  news: NewsItem[];
  onNewsClick?: () => void;
}

const NewsCard: React.FC<{
  item: NewsItem;
  isLarge?: boolean;
  isFeatured?: boolean;
  index: number;
  onClick?: () => void;
}> = ({ item, isLarge = false, isFeatured = false, index, onClick }) => {
  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const textColor = useColorModeValue("gray.900", "white");
  const descColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const metaColor = useColorModeValue("gray.500", "whiteAlpha.600");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const badgeBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const badgeBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const iconBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const iconBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const iconHoverBg = useColorModeValue("gray.200", "whiteAlpha.300");
  const gradientBg = useColorModeValue(
    "linear(to-t, #ffffff, rgba(255,255,255,0.95), rgba(255,255,255,0.85), rgba(255,255,255,0.6), rgba(255,255,255,0.3), transparent)",
    "linear(to-t, #0A0A0A, rgba(10,10,10,0.95), rgba(10,10,10,0.85), rgba(10,10,10,0.6), rgba(10,10,10,0.3), transparent)",
  );

  return (
    <Card
      bg={bg}
      color={textColor}
      overflow="hidden"
      position="relative"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
      }}
      height="100%"
      role="group"
      border="1px solid"
      borderColor={borderColor}
      onClick={onClick}
    >
      {isFeatured ? (
        <>
          <IconButton
            size="sm"
            aria-label="Bookmark"
            icon={<IconBookmarkFilled size={16} />}
            position="absolute"
            right={3}
            top={3}
            zIndex={3}
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
              src={item.image}
              alt={item.title}
              width="100%"
              height="100%"
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
            <Badge
              position="absolute"
              top={3}
              left={3}
              bg={badgeBg}
              backdropFilter="blur(10px)"
              color={textColor}
              fontSize="xs"
              px={3}
              py={1}
              border="1px solid"
              borderColor={badgeBorderColor}
              zIndex={2}
            >
              {item.type}
            </Badge>
          </Box>
          <CardBody
            p={4}
            position="relative"
            zIndex={1}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            minHeight={isLarge ? "300px" : "250px"}
          >
            <Heading size={isLarge ? "lg" : "md"} mb={2} color={textColor}>
              {item.title}
            </Heading>
            <Text color={descColor} fontSize="sm" mb={2} noOfLines={2}>
              {item.description}
            </Text>
            {item.date && (
              <Text fontSize="xs" color={metaColor}>
                {item.date}
              </Text>
            )}
          </CardBody>
        </>
      ) : (
        <CardBody p={4}>
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
          <Flex direction="column" height="100%" justify="space-between">
            <Box>
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Heading size="sm" flex="1" noOfLines={2} color={textColor}>
                  {item.title}
                </Heading>
              </Flex>
              <Badge
                bg={badgeBg}
                backdropFilter="blur(10px)"
                color={textColor}
                mb={2}
                fontSize="xs"
                border="1px solid"
                borderColor={badgeBorderColor}
              >
                {item.type}
              </Badge>
              <Text color={descColor} fontSize="sm" mb={2} noOfLines={3}>
                {item.description}
              </Text>
            </Box>
            <Flex justify="space-between" align="center">
              {item.date && (
                <Text fontSize="xs" color={metaColor}>
                  {item.date}
                </Text>
              )}
              <Box
                width="60px"
                height="60px"
                borderRadius="md"
                overflow="hidden"
                flexShrink={0}
                border="1px solid"
                borderColor={borderColor}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  opacity={0.7}
                  transition="all 0.3s ease"
                  _groupHover={{
                    transform: "scale(1.1)",
                    opacity: 1,
                  }}
                />
              </Box>
            </Flex>
          </Flex>
        </CardBody>
      )}
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

const News: React.FC<NewsProps> = ({ news, onNewsClick }) => {
  return (
    <VStack spacing={0} align="stretch">
      <Heading size="md" mb={4}>
        Noticias
      </Heading>
      <VStack spacing={3} align="stretch">
        {news.map((item, index) => {
          const isFeatured = index === 0;
          return (
            <NewsCard
              key={item.id}
              item={item}
              isLarge={isFeatured}
              isFeatured={isFeatured}
              index={index}
              onClick={onNewsClick}
            />
          );
        })}
      </VStack>
    </VStack>
  );
};

export default News;
