import { Container, HStack, VStack, Avatar, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Comment({ user, content }) {
    // const [showBoxComment, setShowBoxComment] = useState(false);
    // const { auth } = useContext(AuthContext);
    // const imageInputRef = useRef(null);
    // const videoInputRef = useRef(null);
    // const [imagesFile, setImagesFile] = useState([]);
    // const [videosFile, setVideosFile] = useState([]);
    // const handleImageChange = (event) => {
    //     if (event.target.files.length > 0) {
    //         const file = event.target.files;
    //         setImagesFile(file);
    //     }
    // };
    // const handleVideoChange = (event) => {
    //     if (event.target.files.length > 0) {
    //         const file = event.target.files;
    //         setVideosFile(file);
    //     }
    // };
    //   const handleSubmit = async () => {
    //       const formData = new FormData();
    //       formData.append("content", newComment);
    //       if (imagesFile.length > 0) {
    //           imagesFile.forEach((image) => {
    //               formData.append("images", image);
    //           });
    //       }
    //       if (videosFile.length > 0) {
    //           videosFile.forEach((video) => {
    //               formData.append("videos", video);
    //           });
    //       }
    //       try {
    //           const res = await fetch(
    //               `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_POSTS_URL}/${id}/add-comment`,
    //               {
    //                   method: "POST",
    //                   headers: {
    //                       Authorization: `Bearer ${accessToken}`,
    //                   },
    //                   body: formData,
    //               }
    //           );
    //           if (!res.ok) {
    //               console.log("Failed to add comment");
    //           }
    //       } catch (error) {
    //           throw new Error(error);
    //       }
    //   };
    return (
        <Container maxW={"container.2xl"} padding={"25px 20px"} borderRadius={"lg"}>
            {/* <VisuallyHidden>
                <Input multiple onChange={handleImageChange} ref={imageInputRef} type={"file"} name="image" />
            </VisuallyHidden>
            <VisuallyHidden>
                <Input multiple onChange={handleVideoChange} ref={videoInputRef} type={"file"} name="video" />
            </VisuallyHidden> */}
            <HStack align="start">
                <Avatar name={user?.displayName} src={user?.imageUrl} />
                <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">{user?.displayName}</Text>
                    <Text>{content}</Text>
                    {/* <HStack spacing={4}>
                        <Flex gap={5} alignItems={"center"}>
                            <Text>Reply</Text>
                            <FontAwesomeIcon
                                size="lg"
                                color="gray"
                                icon={faComment}
                                cursor={"pointer"}
                                onClick={() => setShowBoxComment(!showBoxComment)}
                            />
                        </Flex>
                    </HStack> */}
                    {/* {showBoxComment && (
                        <Flex
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
                            />
                            <IconButton borderRadius={"full"} onClick={() => imageInputRef.current.click()}>
                                <FontAwesomeIcon icon={faImage} />
                            </IconButton>
                            <IconButton borderRadius={"full"} onClick={() => videoInputRef.current.click()}>
                                <FontAwesomeIcon icon={faVideo} />
                            </IconButton>
                            <Button borderRadius={"full"} paddingX={7} colorScheme={"blue"} height={"50px"}>
                                Save
                            </Button>
                        </Flex>
                    )} */}
                </VStack>
            </HStack>
        </Container>
    );
}

Comment.propTypes = {
    user: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
};

export default Comment;
