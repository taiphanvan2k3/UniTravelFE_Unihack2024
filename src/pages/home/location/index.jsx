import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import useLocation from "@/hooks/useLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faStar } from "@fortawesome/free-solid-svg-icons";
import { DefaultAvatar01 } from "@/assets/images";
import { Fragment, useContext } from "react";
import Comment from "@/components/home/Comment";
import { extractTextFromDescription } from "@/services/utils";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "@/constants/routes";

function LocationPage() {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const { location } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" gap={10} padding={"30px"}>
                <GridItem rowSpan={1} colSpan={3}>
                    <Image
                        src={location.thumbnailUrl}
                        height={"300px"}
                        borderRadius={"lg"}
                        boxShadow={"lg"}
                        className="hover:scale-105 duration-300 ease-in-out"
                    />
                </GridItem>
                <GridItem colSpan={9}>
                    <Flex justifyContent={"start"} alignItems={"center"}>
                        <Text fontWeight={"semibold"} fontSize={"2xl"}>
                            {location.locationName}
                        </Text>
                    </Flex>
                    <Flex alignContent={"end"} gap={2}>
                        <Text fontWeight={"semibold"}>Đánh giá: </Text>
                        <Text>{location.score}</Text>
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 size-6" />
                    </Flex>
                    <Flex alignContent={"end"} gap={2}>
                        <Text fontWeight={"semibold"}>Địa chỉ: </Text>
                        <Text>{location.address}</Text>
                    </Flex>
                    <Flex alignContent={"end"} gap={2} marginTop={"15px"}>
                        <Text textAlign={"justify"}>{extractTextFromDescription(location.description)}</Text>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} colSpan={12}>
                    {Array.isArray(location.reviews) && location.reviews.length > 0 && (
                        <Flex alignItems={"center"} gap={10}>
                            <Text fontWeight={"bold"} fontSize={"2xl"}>
                                Bình luận, đánh giá
                            </Text>
                            <IconButton
                                onClick={() => {
                                    if (!auth.isAuthenticated) {
                                        navigate(ROUTE_CONSTANTS.SIGN_IN_PAGE);
                                    }
                                    onOpen();
                                }}
                            >
                                <FontAwesomeIcon icon={faPenNib} />
                            </IconButton>
                        </Flex>
                    )}
                </GridItem>
                <GridItem rowSpan={8} colSpan={12} boxShadow={"xl"} borderRadius={"lg"}>
                    {location.reviews?.map(
                        (item, index) =>
                            item.reviewerName !== "-" && (
                                <Fragment key={index}>
                                    <Comment
                                        avatar={DefaultAvatar01}
                                        reviewerName={item.reviewerName}
                                        score={item.score}
                                        reviewText={item.reviewText}
                                        reviewPhotos={item.reviewPhotos}
                                    />
                                    <Divider
                                        height={"1px"}
                                        width={"100%"}
                                        bg="gray.200"
                                        marginTop={"10px"}
                                        marginBottom={"10px"}
                                    />
                                </Fragment>
                            )
                    )}
                </GridItem>
            </Grid>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thêm bài đánh giá</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nội dung</FormLabel>
                            <Input type="text" placeholder="Nhập nội dung bài đánh giá" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ảnh</FormLabel>
                            <Input type="file" multiple />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue">Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LocationPage;
