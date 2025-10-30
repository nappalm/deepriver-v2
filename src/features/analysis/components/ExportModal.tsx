import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  Card,
  CardBody,
  VStack,
  Text,
  Box,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  IconShare,
  IconFileExcel,
  IconPdf,
  IconPackageExport,
} from "@tabler/icons-react";

interface ExportOption {
  id: string;
  title: string;
  description: string;
  icon: typeof IconPdf | typeof IconFileExcel;
  color: string;
  bgColor: string;
  action: () => void;
}

export default function ExportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const exportOptions: ExportOption[] = [
    {
      id: "excel",
      title: "Exportar a Excel",
      description:
        "Descarga los datos en formato .xlsx para análisis detallado",
      icon: IconFileExcel,
      color: "green.400",
      bgColor: "green.900",
      action: () => {
        console.log("Exportando a Excel...");
        // Aquí implementarías la lógica de exportación a Excel
        onClose();
      },
    },
    {
      id: "pdf",
      title: "Exportar a PDF",
      description: "Genera un reporte en formato PDF listo para compartir",
      icon: IconPdf,
      color: "red.400",
      bgColor: "red.900",
      action: () => {
        console.log("Exportando a PDF...");
        // Aquí implementarías la lógica de exportación a PDF
        onClose();
      },
    },
  ];

  return (
    <>
      <Button
        size="sm"
        aria-label="Share"
        leftIcon={<IconPackageExport size={16} />}
        onClick={onOpen}
      >
        Exportar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportar análisis</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={4}
            >
              {exportOptions.map((option) => (
                <Card key={option.id} onClick={option.action} cursor="pointer">
                  <CardBody p={5}>
                    <VStack align="start" spacing={3}>
                      <Box
                        bg={option.bgColor}
                        p={3}
                        borderRadius="md"
                        display="inline-flex"
                      >
                        <Icon
                          as={option.icon}
                          boxSize={6}
                          color={option.color}
                        />
                      </Box>
                      <Box>
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="white"
                          mb={1}
                        >
                          {option.title}
                        </Text>
                        <Text fontSize="sm" color="gray.400" lineHeight="short">
                          {option.description}
                        </Text>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
