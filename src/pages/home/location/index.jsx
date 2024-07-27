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
    Box,
    useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faStar, faTicketAlt, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { extractTextFromDescription } from "@/services/utils";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "@/components/social/PostCard";
import { useForm } from "react-hook-form";
import PaypalComponent from "@/components/home/Paypal";

function LocationPage() {
    const { auth } = useContext(AuthContext);
    const [location, setLocation] = useState({});
    const [loading, setLoading] = useState(false);
    const roles = auth.user?.roles;
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOpen: isOpenBookingForm, onOpen: onOpenBookingForm, onClose: onCloseBookingForm } = useDisclosure();
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [date, setDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [locationPrice, setLocationPrice] = useState(0);
    const [locationName, setLocationName] = useState("");
    const { register, handleSubmit } = useForm();
    const { isOpen: isOpenReviewForm, onOpenReviewForm, onCloseReviewForm } = useDisclosure();
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
        const fetchLocations = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_PROVINCES_EXPERIENCE_LOCATIONS}/get-detail/${id}`
                );
                const data = await res.json();
                setLocationPrice(parseInt(data.price.discountedPrice.replace(/\./g, "").replace(" ₫", ""), 10));
                setLocation(data);
                setLocationName(data.locationName);
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };

        if (id) {
            fetchLocations();
        }
    }, [id]);

    useEffect(() => {
        setTotalPrice(locationPrice * (adultCount + childCount * 0.8));
    }, [adultCount, childCount, locationPrice]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
    };

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
            onCloseReviewForm();
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
                            {locationName}
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
                <GridItem rowSpan={1} colSpan={12}>
                    <Flex justifyContent={"flex-end"} width="100%">
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                            colorScheme="blue"
                            className="hover:scale-105 duration-300 ease-in-out mt-5"
                            onClick={() => {
                                onOpenBookingForm();
                            }}
                        >
                            Đặt vé
                        </Button>
                    </Flex>
                </GridItem>

                {!roles?.includes("tour guider") && (
                    <>
                        <GridItem rowSpan={1} colSpan={12}>
                            <Flex alignItems={"center"} gap={10}>
                                <Text fontWeight={"bold"} fontSize={"2xl"}>
                                    Bình luận, đánh giá
                                </Text>
                                <IconButton
                                    onClick={() => {
                                        onOpenReviewForm();
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
            <Modal isOpen={isOpenReviewForm} onClose={onCloseReviewForm}>
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
                            <Button mr={3} onClick={onCloseReviewForm}>
                                Close
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
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
        </>
    );
}

export default LocationPage;
