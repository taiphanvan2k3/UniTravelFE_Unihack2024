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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faStar } from "@fortawesome/free-solid-svg-icons";
import { DefaultAvatar01 } from "@/assets/images";
import { Fragment, useContext, useEffect, useState } from "react";
import Comment from "@/components/home/Comment";
import { extractTextFromDescription } from "@/services/utils";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_CONSTANTS } from "@/constants/routes";
import Post from "@/components/home/Store/Post";
import PostCard from "@/components/social/PostCard";
import { useForm } from "react-hook-form";

function LocationPage() {
    const { auth } = useContext(AuthContext);
    const [location, setLocation] = useState({});
    const [loading, setLoading] = useState(false);
    const roles = auth.user?.roles;
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_PROVINCES_EXPERIENCE_LOCATIONS}/get-detail/${id}`
                );
                const data = await res.json();
                console.log(data);
                setLocation(data);
            } catch (error) {
                throw new Error(error);
            }
        };
        if (id) {
            fetchLocations();
        }
    }, [id]);
    const { register, handleSubmit } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("locationType", "experienceLocation");
        const images = Array.from(data.images);
        const videos = Array.from(data.videos);
        if (images.length > 0) {
            images.forEach((image) => {
                formData.append("images", image);
            });
        }
        if (videos.length > 0) {
            videos.forEach((video) => {
                formData.append("videos", video);
            });
        }
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_POSTS_URL}/${id}/create-post`;
        console.log(formData);
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            body: formData,
        });
        const dataRes = await res.json();
        if (dataRes.status === "success") {
            onClose();
        }
    };
    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" gap={10} paddingX={"100px"}>
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
                        <Text textAlign={"justify"} className="font-jakarta">
                            {extractTextFromDescription(location.description)}
                        </Text>
                    </Flex>
                </GridItem>
                {/* <GridItem rowSpan={1} colSpan={12}>
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
                </GridItem> */}

                {!roles?.includes("tour guider") && (
                    <>
                        <GridItem rowSpan={1} colSpan={12}>
                            <Flex alignItems={"center"} gap={10}>
                                <Text fontWeight={"bold"} fontSize={"2xl"}>
                                    Bình luận, đánh giá
                                </Text>
                                <IconButton
                                    onClick={() => {
                                        onOpen();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPenNib} />
                                </IconButton>
                            </Flex>
                        </GridItem>
                        <GridItem rowSpan={8} colSpan={12} borderRadius={"lg"}>
                            {Array.isArray(location?.comments) && location.comments.length > 0 ? (
                                location.comments.map((item, index) => <PostCard key={item.id} {...item} />)
                            ) : (
                                <Text>No comments</Text>
                            )}
                        </GridItem>
                    </>
                )}
            </Grid>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>
                        <ModalHeader>Thêm bài đánh giá</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nội dung</FormLabel>
                                <Input {...register("content")} type="text" placeholder="Nhập nội dung bài đánh giá" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Ảnh</FormLabel>
                                <Input {...register("images")} type="file" multiple />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Video</FormLabel>
                                <Input {...register("videos")} type="file" multiple />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

export default LocationPage;
