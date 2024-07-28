import Post from "@/components/common/Post";
import { extractTextFromDescription } from "@/services/utils";
import { getNewPost } from "@/utils";
import {
    Box,
    Button,
    Container,
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
    VStack,
} from "@chakra-ui/react";
import { faComment, faGreaterThan, faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { postFuncPath as path } from "@/utils";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "@/contexts/LoadingContext";
import PaypalComponent from "../Paypal";
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
}
function LocationItem({ isCheckIn, price, address, locationName, thumbnailUrl, score, description, id, posts }) {
    const { auth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);
    const [postsData, setPostsData] = useState();
    const { isOpen: isOpenBookingForm, onOpen: onOpenBookingForm, onClose: onCloseBookingForm } = useDisclosure();
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [date, setDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [locationPrice, setLocationPrice] = useState(0);
    const handleCount = ({ person, change }) => {
        const countMap = {
            adult: {
                increment: () => setAdultCount((prev) => prev + 1),
                decrement: () => setAdultCount((prev) => (prev > 0 ? prev - 1 : 0)),
            },
            child: {
                increment: () => setChildCount((prev) => prev + 1),
                decrement: () => setChildCount((prev) => (prev > 0 ? prev - 1 : 0)),
            },
        };

        countMap[person][change]();
    };
    useEffect(() => {
        setTotalPrice(locationPrice * (adultCount + childCount * 0.8));
    }, [adultCount, childCount, locationPrice]);
    useEffect(() => {
        setPostsData(posts);
        if (price) {
            setLocationPrice(parseInt(price.discountedPrice.replace(/\./g, "").replace(" ₫", ""), 10));
        }
    }, [posts, price]);
    const navigate = useNavigate();
    const roundedScore = Math.floor(score);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("locationType", "experienceLocation");
        const imagesData = Array.from(data.images);
        const videoData = Array.from(data.videos);
        imagesData.forEach((image) => formData.append("images", image));
        videoData.forEach((video) => formData.append("videos", video));
        onClose();
        const res = await fetch(path.createPost(id), {
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            body: formData,
        });
        const dataRes = await res.json();
        if (res.ok) {
            const newPost = getNewPost(auth.user, dataRes.data);
            setPostsData((prev) => {
                if (!Array.isArray(prev)) {
                    prev = [];
                }
                return [newPost, ...prev];
            });
        }
        setLoading(false);
    };
    return (
        <Container maxWidth={"1300px"} padding={"50px 0"}>
            <Modal isOpen={isOpenBookingForm} onClose={onCloseBookingForm}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Mẫu đặt vé</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} mb={4}>
                            <FormControl id="adultQuantity" mb={5}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex direction={"column"} alignItems={"start"}>
                                        <FormLabel>{locationPrice.toLocaleString("vi-VN")} ₫/Người lớn</FormLabel>
                                        <Text fontSize={"md"} marginBottom={0}>
                                            Trên 140 cm
                                        </Text>
                                    </Flex>
                                    <Flex alignItems="center">
                                        <IconButton
                                            icon={<FontAwesomeIcon icon={faMinus} color="blue" />}
                                            onClick={() => handleCount({ person: "adult", change: "decrement" })}
                                            isDisabled={adultCount <= 0}
                                            aria-label="Decrease"
                                        />
                                        <Input
                                            type="number"
                                            value={adultCount}
                                            readOnly
                                            textAlign="center"
                                            width="60px"
                                            mx={2}
                                        />
                                        <IconButton
                                            icon={<FontAwesomeIcon icon={faPlus} color="red" />}
                                            onClick={() => handleCount({ person: "adult", change: "increment" })}
                                            aria-label="Increase"
                                        />
                                    </Flex>
                                </Flex>
                            </FormControl>
                            <FormControl id="childQuantity" mb={5}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex direction={"column"} alignItems={"start"}>
                                        <FormLabel>
                                            {(locationPrice * 0.8).toFixed(0).toLocaleString("vi-VN")} ₫/Trẻ em(80%)
                                        </FormLabel>
                                        <Text fontSize={"md"} marginBottom={0}>
                                            Từ 100 - 140 cm
                                        </Text>
                                    </Flex>
                                    <Flex alignItems="center">
                                        <IconButton
                                            icon={<FontAwesomeIcon icon={faMinus} color="blue" />}
                                            onClick={() => handleCount({ person: "child", change: "decrement" })}
                                            isDisabled={childCount <= 0}
                                            aria-label="Decrease"
                                        />
                                        <Input
                                            type="number"
                                            value={childCount}
                                            readOnly
                                            textAlign="center"
                                            width="60px"
                                            mx={2}
                                        />
                                        <IconButton
                                            icon={<FontAwesomeIcon icon={faPlus} color="red" />}
                                            onClick={() => handleCount({ person: "child", change: "increment" })}
                                            aria-label="Increase"
                                        />
                                    </Flex>
                                </Flex>
                            </FormControl>
                            <FormControl id="date" mb={4}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <FormLabel>Ngày bắt đầu</FormLabel>
                                    <Input
                                        width={"160px"}
                                        type="date"
                                        onChange={(e) => setDate(formatDate(e.target.value))}
                                    />
                                </Flex>
                            </FormControl>
                        </Box>
                        <Divider></Divider>
                        <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} mb={4}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Text fontWeight={"bold"} fontSize={"lg"} marginBottom={0}>
                                    Tổng tiền:
                                </Text>
                                <Text fontSize={"lg"} marginBottom={0}>
                                    {totalPrice.toLocaleString("vi-VN")} ₫
                                </Text>
                            </Flex>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <PaypalComponent
                            locationName={locationName}
                            totalPrice={totalPrice}
                            childCount={childCount}
                            childPrice={locationPrice * 0.8}
                            adultCount={adultCount}
                            adultPrice={locationPrice}
                            date={date}
                        />
                        {/* <Button colorScheme="blue" mr={3} onClick={onCloseBookingForm}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={onCloseBookingForm}>
                            Close
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Tạo bài đánh giá</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack gap={4}>
                                <FormControl>
                                    <FormLabel>Nội dung</FormLabel>
                                    <Input {...register("content", { required: true })} type="text" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Ảnh</FormLabel>
                                    <Input {...register("images")} type="file" multiple />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Video</FormLabel>
                                    <Input {...register("videos")} type="file" multiple />
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter gap={4}>
                            <Button padding={"10px 25px"} onClick={onClose} variant="ghost">
                                Đóng
                            </Button>
                            <Button padding={"10px 25px"} colorScheme="blue" mr={3} type="submit">
                                Lưu
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <Flex alignItems={"center"} gap={4} justifyContent={"start"} marginBottom={5}>
                <Text fontWeight={"bold"} color="gray.300">
                    Tỉnh, thành
                </Text>
                <FontAwesomeIcon className="size-3 text-gray-300" icon={faGreaterThan} />
                <Text fontWeight={"bold"} color="gray.300">
                    Địa điểm
                </Text>
            </Flex>
            <Grid gap={4} templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
                <GridItem colSpan={1}>
                    <Image src={thumbnailUrl} height={"400px"} width={"90%"} borderRadius={"xl"} />
                </GridItem>
                <GridItem>
                    <Text fontWeight={"bold"} fontSize={"2xl"} className="text-primary-100">
                        {locationName}
                    </Text>
                    <Flex marginTop={3} alignItems={"center"} gap={1}>
                        {Array.from({ length: roundedScore }).map((_, index) => (
                            <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400" />
                        ))}
                        <Text marginLeft={2} fontWeight={"semibold"} className="text-primary-100" fontSize={"lg"}>
                            ({roundedScore})
                        </Text>
                    </Flex>
                    <Flex marginTop={6} alignItems={"center"} gap={5}>
                        {price?.discountedPrice && (
                            <Text fontWeight={"bold"} fontSize={"2xl"}>
                                {formatPrice(price?.discountedPrice)}
                            </Text>
                        )}
                        {price?.originalPrice && (
                            <Text fontWeight={"bold"} fontSize={"lg"} textDecoration="line-through">
                                {formatPrice(price.originalPrice)}
                            </Text>
                        )}
                    </Flex>
                    <Text marginTop={6} fontSize={"sm"} color={"gray.500"} className="font-roboto text-justify">
                        {address}
                    </Text>
                    {description && (
                        <>
                            <Box width={"100%"} marginTop={6} height={0.5} backgroundColor={"gray.200"}></Box>
                            <Text marginTop={6} fontSize={"sm"} color={"gray.500"} className="font-roboto text-justify">
                                {extractTextFromDescription(description)}
                            </Text>
                        </>
                    )}

                    <Box width={"100%"} marginTop={6} height={0.5} backgroundColor={"gray.200"}></Box>
                    <button
                        onClick={onOpenBookingForm}
                        className="px-8 py-3 rounded-lg font-semibold bg-primary-100 text-white mt-6"
                    >
                        Đặt vé
                    </button>
                </GridItem>
            </Grid>
            <Box width={"100%"} marginTop={12} marginBottom={6} height={0.5} backgroundColor={"gray.200"}></Box>
            <Flex marginY={10} alignItems={"center"} gap={4}>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                    Bài đánh giá
                </Text>
                {isCheckIn && (
                    <FontAwesomeIcon
                        className="size-6 text-primary-100"
                        icon={faComment}
                        cursor={"pointer"}
                        onClick={() => {
                            if (auth?.token) {
                                onOpen();
                            } else {
                                navigate("/auth/sign-in");
                            }
                        }}
                    />
                )}
            </Flex>
            {postsData &&
                postsData.map((post, index) => (
                    <React.Fragment key={index}>
                        <Post
                            isCheckIn={isCheckIn}
                            locationId={post.experienceLocation}
                            author={post.author}
                            imageUrls={post.imageUrls}
                            videoUrls={post.videoUrls}
                            upvoteCount={post.upvoteCount}
                            content={post.content}
                            id={post.id}
                            comments={post.comments}
                        />
                        <Box margin={"20px 0"} width={"100%"} height={0.5} backgroundColor={"gray.200"}></Box>
                    </React.Fragment>
                ))}
        </Container>
    );
}

LocationItem.propTypes = {
    isCheckIn: PropTypes.bool,
    price: PropTypes.object,
    address: PropTypes.string,
    locationName: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    score: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    posts: PropTypes.array,
};

export default LocationItem;
