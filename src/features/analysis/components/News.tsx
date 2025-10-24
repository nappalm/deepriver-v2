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

const News: React.FC<NewsProps> = ({ news }) => {
  return (
    <VStack spacing={0} align="stretch">
      <Heading size="md" mb={2}>
        Noticias
      </Heading>
      {news.map((item) => (
        <Card key={item.id} mb="-1px" borderRadius={0} borderStyle="dashed">
          <CardBody p={3}>
            <Flex gap={3}>
              <Image
                src={item.image}
                alt={item.title}
                width="80px"
                height="80px"
                objectFit="cover"
                borderRadius="md"
                flexShrink={0}
              />
              <Box flex="1">
                <Flex justify="space-between" align="flex-start" mb={1}>
                  <Heading size="sm" flex="1">
                    {item.title}
                  </Heading>
                  <Badge colorScheme="blue" ml={2} flexShrink={0}>
                    {item.type}
                  </Badge>
                </Flex>
                <Text color="gray.600" fontSize="sm" mb={2} noOfLines={2}>
                  {item.description}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {item.newsCount}{" "}
                  {item.newsCount === 1 ? "noticia" : "noticias"}
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default News;
