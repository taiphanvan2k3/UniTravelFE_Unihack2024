import {
    Box,
    Button,
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
import { faComment, faDownload, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { getNewPost, getProvincesName } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import CommentStore from "./CommentStore";
import { LoadingContext } from "@/contexts/LoadingContext";
import { postFuncPath as path } from "@/utils";
import { useForm } from "react-hook-form";

function Store({
    name,
    province,
    detailAddress,
    openingHours,
    businessType,
    owner,
    thumbnailUrl,
    qrCodeUrl,
    imageUrls,
    videoUrls,
    id,
    comments,
}) {
    const { auth } = useContext(AuthContext);
    const [modalIndex, setModalIndex] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postsData, setPostsData] = useState();
    const { setLoading } = useContext(LoadingContext);
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        setPostsData(comments);
    }, [comments]);
    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("locationType", "store");
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
        <>
            <Grid gap={4} templateColumns={["repeat(1, 1fr)", null, "repeat(2, 1fr)"]}>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalContent maxWidth={"500px"}>
                            <ModalHeader>
                                {modalIndex === 1 ? (
                                    <Flex gap={3} alignItems={"center"}>
                                        <a href={qrCodeUrl}>
                                            <FontAwesomeIcon icon={faDownload} cursor={"pointer"} />
                                        </a>
                                        <Text className="ml-2">QR Code</Text>
                                    </Flex>
                                ) : modalIndex === 2 ? (
                                    name
                                ) : modalIndex === 3 ? (
                                    "Thêm comment"
                                ) : null}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {modalIndex === 1 ? (
                                    <Image src={qrCodeUrl} width={"full"} />
                                ) : modalIndex === 2 ? (
                                    <video width="1920" height="1080" loop controls>
                                        {/* {store && <source src={`${store.videoUrls}`} type="video/mp4" />} */}
                                    </video>
                                ) : modalIndex === 3 ? (
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
                                ) : null}
                            </ModalBody>
                            {modalIndex == 3 && (
                                <ModalFooter gap={4}>
                                    <Button padding={"10px 25px"} onClick={onClose} variant="ghost">
                                        Đóng
                                    </Button>
                                    <Button padding={"10px 25px"} colorScheme="blue" mr={3} type="submit">
                                        Lưu
                                    </Button>
                                </ModalFooter>
                            )}
                        </ModalContent>
                    </form>
                </Modal>
                <GridItem colSpan={1}>
                    <Image src={thumbnailUrl} height={"500px"} width={"90%"} borderRadius={"xl"} />
                    <Flex gap={4} marginTop={4}>
                        {imageUrls &&
                            imageUrls.map((item, index) => (
                                <Image key={index} src={item} height={"100px"} width={"150px"} borderRadius={"xl"} />
                            ))}
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text className="text-primary-100 font-roboto" fontWeight={"bold"} fontSize={"2xl"}>
                            {name}
                        </Text>
                        <IconButton
                            onClick={() => {
                                setModalIndex(1);
                                onOpen();
                            }}
                            icon={<FontAwesomeIcon icon={faQrcode} />}
                        />
                    </Flex>
                    <Text className="mt-1 text-lg capitalize font-semibold text-primary-100 font-roboto">
                        {businessType}
                    </Text>
                    <Flex gap={3} marginTop={1}>
                        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"lg"}>
                            {detailAddress}
                        </Text>
                        -
                        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"lg"}>
                            {province && getProvincesName(province)}
                        </Text>
                    </Flex>

                    <Flex gap={3} marginTop={1}>
                        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"lg"}>
                            Opening :
                        </Text>
                        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"lg"} marginLeft={2}>
                            {openingHours}
                        </Text>
                    </Flex>
                </GridItem>
            </Grid>
            <Box width={"100%"} marginTop={12} marginBottom={6} height={0.5} backgroundColor={"gray.200"}></Box>
            <Flex marginY={10} alignItems={"center"} gap={4}>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                    Bài đánh giá
                </Text>
                {auth?.user?.roles && !auth.user.roles.includes("store-owner") && (
                    <FontAwesomeIcon
                        className="size-6 text-primary-100"
                        icon={faComment}
                        cursor={"pointer"}
                        onClick={() => {
                            if (auth?.token) {
                                onOpen();
                                setModalIndex(3);
                            } else {
                                Navigate("/auth/sign-in");
                            }
                        }}
                    />
                )}
            </Flex>
            {postsData && postsData.length > 0 ? (
                postsData.map((comment, index) => <CommentStore key={index} {...comment} />)
            ) : (
                <Text marginTop={6} fontSize={"sm"} color={"gray.500"} className="font-roboto text-justify">
                    Chua co bai dang
                </Text>
            )}
        </>
    );
}
Store.propTypes = {
    name: PropTypes.string,
    province: PropTypes.string,
    detailAddress: PropTypes.string,
    openingHours: PropTypes.string,
    businessType: PropTypes.string,
    owner: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    qrCodeUrl: PropTypes.string,
    imageUrls: PropTypes.array,
    videoUrls: PropTypes.array,
    id: PropTypes.string,
    comments: PropTypes.array,
};
export default Store;
