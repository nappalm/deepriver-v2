import {
  Badge,
  Box,
  Heading,
  IconButton,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { IconBookmarkFilled } from "@tabler/icons-react";
import { NewsItem, NewsProps } from "../utils/types";

const NewsRow = ({
  item,
  onClick,
}: {
  item: NewsItem;
  onClick?: () => void;
}) => {
  return (
    <Tr
      cursor="pointer"
      role="group"
      onClick={onClick}
      _hover={{ bg: "whiteAlpha.100" }}
      transition="background 0.2s"
    >
      <Td p={2} width="60px">
        <Box
          w="50px"
          h="50px"
          borderRadius="md"
          overflow="hidden"
          border="1px solid"
          borderColor="whiteAlpha.200"
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
      </Td>
      <Td p={2}>
        <Box>
          <Text fontSize="sm" fontWeight="semibold" noOfLines={1} mb={1}>
            {item.title}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.700" noOfLines={1}>
            {item.description}
          </Text>
        </Box>
      </Td>
      <Td p={2} width="120px">
        <Badge variant="bordered" size="sm">
          {item.type}
        </Badge>
      </Td>
      <Td p={2} width="110px">
        <Text fontSize="xs" color="whiteAlpha.600">
          {item.date}
        </Text>
      </Td>
      <Td p={2} width="100px" textAlign="center">
        <Text fontSize="xs" color="whiteAlpha.600" fontWeight="medium">
          {item.newsCount}
        </Text>
      </Td>
      <Td p={2} width="50px" textAlign="center">
        <IconButton
          size="xs"
          aria-label="Bookmark"
          icon={<IconBookmarkFilled size={16} />}
          variant="ghost"
          color="whiteAlpha.600"
          _hover={{ bg: "whiteAlpha.200", color: "white" }}
          onClick={(e) => {
            e.stopPropagation();
            // Lógica de bookmark aquí
          }}
        />
      </Td>
    </Tr>
  );
};

const News = ({ news, onNewsClick }: NewsProps) => (
  <VStack spacing={0} align="stretch">
    <Heading size="sm" mb={3}>
      Noticias
    </Heading>
    <Box
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <Table variant="simple" size="sm">
        <Thead bg="whiteAlpha.50">
          <Tr>
            <Th />
            <Th>Noticia</Th>
            <Th>Categoría</Th>
            <Th>Fecha</Th>
            <Th>Noticias</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {news.map((item) => (
            <NewsRow key={item.id} item={item} onClick={onNewsClick} />
          ))}
        </Tbody>
      </Table>
    </Box>
  </VStack>
);

export default News;
