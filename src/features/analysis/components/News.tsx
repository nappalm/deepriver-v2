import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface NewsItem {
  id: string;
  image: string;
  title: string;
  description: string;
  newsCount: number;
  type: string;
}

interface NewsProps {
  news: NewsItem[];
}

const NewsCard: React.FC<{
  item: NewsItem;
  isLarge?: boolean;
  isFeatured?: boolean;
  index: number;
}> = ({ item, isLarge = false, isFeatured = false, index }) => {
  return (
    <Card
      bg="#000"
      color="white"
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
      borderColor="whiteAlpha.200"
    >
      {isFeatured ? (
        <>
          <Box position="relative" height={isLarge ? "300px" : "200px"}>
            <Image
              src={item.image}
              alt={item.title}
              width="100%"
              height="100%"
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
            <Badge
              position="absolute"
              top={3}
              right={3}
              bg="whiteAlpha.200"
              backdropFilter="blur(10px)"
              color="white"
              fontSize="xs"
              px={3}
              py={1}
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              {item.type}
            </Badge>
          </Box>
          <CardBody p={4} mt={-20} position="relative" zIndex={1}>
            <Heading size={isLarge ? "lg" : "md"} mb={2} color="white">
              {item.title}
            </Heading>
            <Text color="whiteAlpha.700" fontSize="sm" mb={2} noOfLines={2}>
              {item.description}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600" fontWeight="medium">
              {item.newsCount} {item.newsCount === 1 ? "noticia" : "noticias"}
            </Text>
          </CardBody>
        </>
      ) : (
        <CardBody p={4}>
          <Flex direction="column" height="100%" justify="space-between">
            <Box>
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Heading size="sm" flex="1" noOfLines={2} color="white">
                  {item.title}
                </Heading>
              </Flex>
              <Badge
                bg="whiteAlpha.200"
                backdropFilter="blur(10px)"
                color="white"
                mb={2}
                fontSize="xs"
                border="1px solid"
                borderColor="whiteAlpha.300"
              >
                {item.type}
              </Badge>
              <Text color="whiteAlpha.700" fontSize="sm" mb={2} noOfLines={3}>
                {item.description}
              </Text>
            </Box>
            <Flex justify="space-between" align="center">
              <Text fontSize="xs" color="whiteAlpha.600" fontWeight="medium">
                {item.newsCount} {item.newsCount === 1 ? "noticia" : "noticias"}
              </Text>
              <Box
                width="60px"
                height="60px"
                borderRadius="md"
                overflow="hidden"
                flexShrink={0}
                border="1px solid"
                borderColor="whiteAlpha.200"
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

const News: React.FC<NewsProps> = ({ news }) => {
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
            />
          );
        })}
      </VStack>
    </VStack>
  );
};

export default News;
