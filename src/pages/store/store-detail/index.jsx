import { LoadingContext } from "@/contexts/LoadingContext";
import {
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VisuallyHidden,
    VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import provinces from "@/assets/images/city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faImage, faQrcode, faVideo } from "@fortawesome/free-solid-svg-icons";
import Post from "@/components/home/Store/Post";
import { AuthContext } from "@/contexts/AuthContext";
function StoreDetailPage() {
    const { auth } = useContext(AuthContext);
    const { storeId } = useParams();
    const [store, setStore] = useState();
    const { loading, setLoading } = useContext(LoadingContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
    const [qrCode, setQrCode] = useState();
    const [content, setContent] = useState();
    const handleClickQrButton = async () => {
        try {
            setIsQrCodeModalOpen(true);
            onOpen();
            setLoading(true); // Assuming you have a setLoading function to manage loading state

            // Validate environment variables
            const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
            const storesUrl = import.meta.env.VITE_STORES_URL;
            if (!baseUrl || !storesUrl) {
                throw new Error("Server URL configuration is missing.");
            }

            const url = `${baseUrl}${storesUrl}/${storeId}/get-qr-code`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch QR code: ${res.statusText}`);
            }

            const data = await res.json();
            setQrCode(data.qrCodeUrl);
            setLoading(false); // Ensure loading state is reset whether the fetch succeeds or fails
        } catch (error) {
            console.error("Error fetching QR code:", error.message);
            // Handle error (e.g., show error message to the user)
        } finally {
            setLoading(false); // Ensure loading state is reset whether the fetch succeeds or fails
        }
    };
    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_STORES_URL}/${storeId}`
                );
                if (!res.ok) {
                    throw new Error(res.statusText);
                } else {
                    const data = await res.json();
                    data.provinces = provinces.find((province) => province.id === data.province).name;
                    setStore(data);
                    setLoading(false);
                }
            } catch (error) {
                throw new Error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStores();
    }, [storeId, setLoading]);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [imagesFile, setImagesFile] = useState([]);
    const [videosFile, setVideosFile] = useState([]);
    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files;
            setImagesFile(file);
        }
    };
    const handleVideoChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files;
            setVideosFile(file);
        }
    };
    const handleAddPost = async () => {
        if (content && content.length > 0) {
            const formData = new FormData();
            formData.append("content", content);
            formData.append("locationType", "store");
            if (imagesFile.length > 0) {
                imagesFile.forEach((image) => {
                    formData.append("images", image);
                });
            }
            if (videosFile.length > 0) {
                videosFile.forEach((video) => {
                    formData.append("videos", video);
                });
            }
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_POSTS_URL}/${storeId}/create-post`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                        body: formData,
                    }
                );
                console.log(res);
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    };
    const download = (e) => {
        console.log(e.target.href);
        fetch(e.target.href, {
            method: "GET",
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    if (!loading) {
        return (
            <Container maxW={"container.2xl"} height={"100vh"} paddingX={"3rem"}>
                <VisuallyHidden>
                    <Input multiple onChange={handleImageChange} ref={imageInputRef} type={"file"} name="image" />
                </VisuallyHidden>
                <VisuallyHidden>
                    <Input multiple onChange={handleVideoChange} ref={videoInputRef} type={"file"} name="video" />
                </VisuallyHidden>
                <Grid templateColumns={"repeat(6, 1fr)"} gap={10}>
                    <GridItem colSpan={2}>
                        <VStack>
                            <Image
                                src={store?.thumbnailUrl}
                                borderRadius={"xl"}
                                className="hover:scale-105 duration-300 ease-in-out cursor-pointer"
                                onClick={() => {
                                    onOpen();
                                    setIsQrCodeModalOpen(false);
                                }}
                            />
                            <Flex marginTop={5} gap={4} justifyContent={"start"} width={"100%"}>
                                {store?.imageUrls.map((url, index) => (
                                    <Image
                                        width={"150px"}
                                        aspectRatio={"2/1"}
                                        key={index}
                                        src={url}
                                        cursor={"pointer"}
                                        borderRadius={"md"}
                                        onClick={() => window.open(url)}
                                    />
                                ))}
                            </Flex>
                        </VStack>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Flex alignItems={"center"} justifyContent={"space-between"}>
                            <Text fontWeight={"bold"} fontSize={"3xl"} className="font-roboto">
                                {store?.name}
                            </Text>
                            <button
                                className="px-4 py-3 bg-black text-white rounded-full "
                                onClick={handleClickQrButton}
                            >
                                <FontAwesomeIcon icon={faQrcode} />
                                <span className="ml-2">QR Code</span>
                            </button>
                        </Flex>
                        <Text fontWeight={"bold"} fontSize={"md"} className="font-roboto" color={"gray"}>
                            {store?.detailAddress} - {store?.provinces}
                        </Text>
                        <Text fontWeight={"bold"} fontSize={"md"} className="font-roboto" color={"black"} marginTop={5}>
                            Opening: {store?.openingHours}
                        </Text>
                        <Text fontWeight={"bold"} fontSize={"md"} className="font-roboto" color={"black"} marginTop={5}>
                            Type business: {store?.businessType}
                        </Text>
                    </GridItem>
                </Grid>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent maxWidth={"500px"}>
                        <ModalHeader>
                            {isQrCodeModalOpen ? (
                                <Flex gap={3} alignItems={"center"}>
                                    <a href={qrCode} download onClick={(e) => download(e)}>
                                        <FontAwesomeIcon icon={faDownload} cursor={"pointer"} onClick={download} />
                                    </a>
                                    <Text className="ml-2">Download QR Code</Text>
                                </Flex>
                            ) : (
                                store?.name
                            )}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {!isQrCodeModalOpen ? (
                                <video width="1920" height="1080" loop controls>
                                    {store && <source src={`${store.videoUrls}`} type="video/mp4" />}
                                </video>
                            ) : (
                                <>
                                    <Image src={qrCode} width={"full"} />
                                </>
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <Text marginTop={10} fontWeight={"bold"} fontSize={"2xl"} className="font-roboto" color={"black"}>
                    Reviews
                </Text>
                <Flex
                    marginTop={5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={5}
                    border={"2px"}
                    borderRadius={"full"}
                    borderColor={"gray.200"}
                    padding={2}
                >
                    <Input
                        placeholder="Add a comment"
                        width={"500px"}
                        border={"none"}
                        _focusVisible="none"
                        height={"50px"}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Flex alignItems={"center"} gap={3}>
                        <IconButton borderRadius={"full"} onClick={() => imageInputRef.current.click()}>
                            <FontAwesomeIcon icon={faImage} />
                        </IconButton>
                        <IconButton borderRadius={"full"} onClick={() => videoInputRef.current.click()}>
                            <FontAwesomeIcon icon={faVideo} />
                        </IconButton>
                        <Button
                            onClick={handleAddPost}
                            borderRadius={"full"}
                            paddingX={7}
                            colorScheme={"blue"}
                            height={"50px"}
                        >
                            Save
                        </Button>
                    </Flex>
                </Flex>
                {store?.comments.map((comment) => (
                    <Post
                        id={comment.id}
                        author={comment.author}
                        content={comment.content}
                        imageUrls={comment.imageUrls}
                        upvoteCount={comment.upvoteCount}
                        key={comment.id}
                        sampleComments={comment.comments}
                    />
                ))}
            </Container>
        );
    }
    return null;
}

export default StoreDetailPage;
