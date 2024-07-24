import {
    Button,
    Container,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LocationPage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Grid h={"100%"} templateColumns={"repeat(3, 1fr)"} templateRows={"repeat(12, 1fr)"} gap={8}>
            <GridItem rowSpan={1} colSpan={3}>
                <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontWeight={"bold"} fontSize={"3xl"}>
                        Location Tourism
                    </Text>
                    <IconButton icon={<FontAwesomeIcon icon={faPlus} color={"blue"} />} onClick={onOpen}></IconButton>
                </Flex>
            </GridItem>
            <GridItem rowSpan={3} colSpan={1}>
                <Container bg={"white"} width={"100%"} height={"100%"} borderRadius={"lg"} boxShadow={"xl"}></Container>
            </GridItem>
            <GridItem rowSpan={3} colSpan={1}>
                <Container bg={"white"} width={"100%"} height={"100%"} borderRadius={"lg"} boxShadow={"xl"}></Container>
            </GridItem>
            <GridItem rowSpan={3} colSpan={1}>
                <Container bg={"white"} width={"100%"} height={"100%"} borderRadius={"lg"} boxShadow={"xl"}></Container>
            </GridItem>
            <GridItem rowSpan={8} colSpan={3}>
                <Container bg={"white"} minWidth={"100%"} height={"100%"} borderRadius={"lg"} boxShadow={"xl"}>
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create your account</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl marginBottom={3}>
                                    <FormLabel>Location Name</FormLabel>
                                    <Input type="text" placeholder={"Enter location name"} />
                                </FormControl>
                                <FormControl marginBottom={3}>
                                    <FormLabel>Address</FormLabel>
                                    <Input type="text" placeholder={"Enter address location"} />
                                </FormControl>
                                <FormControl marginBottom={3}>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <Input type="file" placeholder={"Enter address location"} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Price</FormLabel>
                                    <NumberInput min={0}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <TableContainer overflowY={"auto"} height={"100%"}>
                        <Table size="lg">
                            <Thead>
                                <Tr>
                                    <Th>Location Name</Th>
                                    <Th>Address</Th>
                                    <Th>Image</Th>
                                    <Th isNumeric>Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>millimetres (mm)</Td>
                                    <Td isNumeric>25.4</Td>
                                </Tr>
                                <Tr>
                                    <Td>feet</Td>
                                    <Td>centimetres (cm)</Td>
                                    <Td isNumeric>30.48</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Container>
            </GridItem>
        </Grid>
    );
}

export default LocationPage;
