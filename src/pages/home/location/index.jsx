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
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import useLocation from "@/hooks/useLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faStar } from "@fortawesome/free-solid-svg-icons";
import { DefaultAvatar01 } from "@/assets/images";
import { Fragment, useContext, useEffect } from "react";
import Comment from "@/components/home/Comment";
import { extractTextFromDescription } from "@/services/utils";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "@/constants/routes";
import { tourGuider } from "@/data";

function LocationPage() {
    const { auth } = useContext(AuthContext);
    const roles = auth.user?.roles;
    const navigate = useNavigate();
    const { location } = useLocation();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const url = `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_PROVINCES_EXPERIENCE_LOCATIONS}/${location.id}${import.meta.env.VITE_POSTS_URL}?pageIndex=1&pageSize=10`;
                const result = await fetch(url);
                console.log(await result.json());
            } catch (error) {
                console.error(error);
            }
        };
        if (location.id) {
            fetchPosts();
        }
    }, [location.id]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" gap={10} padding={"30px"}>
                <GridItem rowSpan={1} colSpan={3}>
                    <Stack alignItems={"center"}>
                        <Image
                            src={location.thumbnailUrl}
                            height={"320px"}
                            borderRadius={"lg"}
                            boxShadow={"lg"}
                            className="hover:scale-105 duration-300 ease-in-out"
                        />
                        {roles?.includes("tour-guider") && (
                            <Button colorScheme="blue" className="hover:scale-105 duration-300 ease-in-out w-full mt-5">
                                Đăng ký làm hướng dẫn viên
                            </Button>
                        )}
                    </Stack>
                </GridItem>
                <GridItem colSpan={9}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontWeight={"semibold"} fontSize={"2xl"} className="font-roboto">
                            {location.locationName}
                        </Text>
                    </Flex>
                    <Flex alignContent={"end"} gap={2}>
                        <Text fontWeight={"semibold"} className="font-roboto">
                            Đánh giá:{" "}
                        </Text>
                        <Text>{location.score}</Text>
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 size-6" />
                    </Flex>
                    <Flex alignContent={"end"} gap={2}>
                        <Text fontWeight={"semibold"} className="font-roboto">
                            Địa chỉ:{" "}
                        </Text>
                        <Text className="font-roboto">{location.address}</Text>
                    </Flex>
                    <Flex alignContent={"end"} gap={2} marginTop={"15px"}>
                        <Text textAlign={"justify"} className="font-roboto">
                            {extractTextFromDescription(location.description)}
                        </Text>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} colSpan={12}>
                    <Stack>
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                            Top 5 tour guider
                        </Text>
                        <Grid templateColumns={"repeat(5, 1fr)"} gap={10} padding={"30px"}>
                            {tourGuider.map((item, index) => (
                                <GridItem
                                    key={index}
                                    colSpan={1}
                                    boxShadow={"lg"}
                                    borderRadius={"md"}
                                    className="group"
                                >
                                    <Stack className="w-full h-full">
                                        <div className="h-full group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/40 transition-shadow rounded-md">
                                            <Image src={item.avatar} className="rounded-t-md" />
                                            <Flex
                                                padding={"10px"}
                                                justifyContent={"space-between"}
                                                alignItems={"center"}
                                            >
                                                <Stack>
                                                    <Text fontWeight={"bold"} fontSize={"md"}>
                                                        {item.name}
                                                    </Text>
                                                    <Flex alignItems={"center"} gap={2}>
                                                        <Text>{item.rate}</Text>
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className="text-yellow-400 size-4"
                                                        />
                                                    </Flex>
                                                </Stack>
                                                <Button variant={"outline"} colorScheme={"blue"}>
                                                    Contact
                                                </Button>
                                            </Flex>
                                        </div>
                                    </Stack>
                                </GridItem>
                            ))}
                        </Grid>
                    </Stack>
                </GridItem>
                {!roles?.includes("tour guider") && (
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
                )}
                {!roles?.includes("tour guider") && (
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
                )}
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
