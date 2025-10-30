import {
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
  useColorModeValue,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { IconFileExcel, IconPdf, IconPackageExport } from "@tabler/icons-react";

export default function ExportModal() {
  const excelBg = useColorModeValue("green.50", "green.900");
  const pdfBg = useColorModeValue("red.50", "red.900");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleExportExcel = () => {
    console.log("Exportando a Excel...");
    // Aquí implementarías la lógica de exportación a Excel
    onClose();
  };

  const handleExportPDF = () => {
    console.log("Exportando a PDF...");
    // Aquí implementarías la lógica de exportación a PDF
    onClose();
  };

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportar análisis</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <Stack>
              <Card onClick={handleExportExcel} cursor="pointer">
                <CardBody p={5}>
                  <HStack align="start" gap={5}>
                    <Box
                      bg={excelBg}
                      p={3}
                      borderRadius="md"
                      display="inline-flex"
                    >
                      <Icon as={IconFileExcel} boxSize={6} color="green.400" />
                    </Box>
                    <Box>
                      <Text fontSize="md" fontWeight="semibold" mb={1}>
                        Exportar a Excel
                      </Text>
                      <Text fontSize="sm" color="gray.400" lineHeight="short">
                        Descarga los datos en formato .xlsx para análisis
                        detallado
                      </Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>

              <Card onClick={handleExportPDF} cursor="pointer">
                <CardBody p={5}>
                  <HStack align="start" gap={5}>
                    <Box
                      bg={pdfBg}
                      p={3}
                      borderRadius="md"
                      display="inline-flex"
                    >
                      <Icon as={IconPdf} boxSize={6} color="red.400" />
                    </Box>
                    <Box>
                      <Text fontSize="md" fontWeight="semibold" mb={1}>
                        Exportar a PDF
                      </Text>
                      <Text fontSize="sm" color="gray.400" lineHeight="short">
                        Genera un reporte en formato PDF listo para compartir
                      </Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
