import {
    Container,
    HStack,
    VStack,
    Avatar,
    Text,
    Box,
    Flex,
    Input,
    Button,
    Image,
    IconButton,
    VisuallyHidden,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import UpVoteIcon from "../icons/UpVote";
import DownVoteIcon from "../icons/DownVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useReducer, useRef, useState } from "react";
import { faComment, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import reducer from "@/utils/vote";
import { DefaultAvatar01 } from "@/assets/images";
import Reply from "./Reply";
import { AuthContext } from "@/contexts/AuthContext";

function Comment({ postId, _id, user, content, imageUrls, videoUrls, upvoteCount, replies }) {
    const { auth } = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, { votes: upvoteCount, isUpvoted: false, isDownvoted: false });
    const [showBoxComment, setShowBoxComment] = useState(false);
    const [newComment, setNewComment] = useState();
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
    const handleReply = async () => {
        try {
            if (newComment) {
                const formData = new FormData();
                formData.append("content", newComment);
                const imagesArray = Array.from(imagesFile);
                const videosArray = Array.from(videosFile);
                if (imagesArray.length > 0) {
                    imagesArray.forEach((image) => {
                        formData.append("images", image);
                    });
                }
                if (videosArray.length > 0) {
                    videosArray.forEach((video) => {
                        formData.append("videos", video);
                    });
                }
                const url = `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_POSTS_URL}/${postId}/${_id}/add-reply`;
                console.log(url);
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: formData,
                });
                if (!res.ok) {
                    console.log("Failed to add reply");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container maxW={"container.2xl"} padding={"25px 20px"} borderRadius={"lg"}>
            <VisuallyHidden>
                <Input multiple onChange={handleImageChange} ref={imageInputRef} type={"file"} name="image" />
            </VisuallyHidden>
            <VisuallyHidden>
                <Input multiple onChange={handleVideoChange} ref={videoInputRef} type={"file"} name="video" />
            </VisuallyHidden>
            <HStack align="start">
                <Box position={"relative"}>
                    <Avatar
                        size={"md"}
                        name={user?.displayName}
                        src={user?.imageUrl === undefined ? DefaultAvatar01 : user?.imageUrl}
                    />
                    <Image
                        position={"absolute"}
                        top={0}
                        right={0}
                        width={"15px"}
                        borderRadius={"full"}
                        src={user?.badges[0]?.imageUrl}
                    />
                </Box>

                <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">{user?.displayName}</Text>
                    <Text>{content}</Text>
                    <Flex gap={4}>
                        {imageUrls.map((url, index) => (
                            <Image key={index} src={url} width={"100px"} height={"100px"} borderRadius={"lg"} />
                        ))}
                        {Array.isArray(videoUrls)
                            ? videoUrls?.map((url, index) => (
                                  <video key={index} src={url} width={"170px"} height={"250px"} controls />
                              ))
                            : null}
                    </Flex>
                    <HStack spacing={4}>
                        <Flex gap={5} alignItems={"center"}>
                            <Flex padding={4} gap={3} alignItems={"center"}>
                                <UpVoteIcon
                                    onClick={() => dispatch({ type: "upvote" })}
                                    fill={state.isUpvoted ? "#0091FF" : "#000000"}
                                />
                                <Text fontWeight={"bold"}>{state.votes}</Text>
                                <DownVoteIcon
                                    onClick={() => dispatch({ type: "downvote" })}
                                    fill={state.isDownvoted ? "#0091FF" : "#000000"}
                                />
                            </Flex>
                            <Flex alignItems={"center"} gap={3} borderRadius={"2xl"}>
                                <FontAwesomeIcon
                                    size="lg"
                                    color="gray"
                                    icon={faComment}
                                    cursor={"pointer"}
                                    onClick={() => setShowBoxComment(!showBoxComment)}
                                />
                            </Flex>
                        </Flex>
                    </HStack>
                    {showBoxComment && (
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
                                width={"100%"}
                                border={"none"}
                                _focusVisible="none"
                                height={"50px"}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <IconButton
                                onClick={() => imageInputRef.current.click()}
                                borderRadius={"full"}
                                icon={<FontAwesomeIcon icon={faImage} />}
                            ></IconButton>
                            <IconButton
                                onClick={() => videoInputRef.current.click()}
                                borderRadius={"full"}
                                icon={<FontAwesomeIcon icon={faVideo} />}
                            ></IconButton>
                            <Button
                                borderRadius={"full"}
                                paddingX={7}
                                colorScheme={"blue"}
                                height={"50px"}
                                onClick={handleReply}
                            >
                                Save
                            </Button>
                        </Flex>
                    )}
                    {replies && replies.length > 0 && (
                        <Box pl={4} borderLeft="1px" borderColor="gray.200" mt={2}>
                            {replies.map((reply) => (
                                <Reply key={reply._id} postId={postId} _id={_id} {...reply} />
                            ))}
                        </Box>
                    )}
                </VStack>
            </HStack>
        </Container>
    );
}

Comment.propTypes = {
    postId: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    videoUrls: PropTypes.array.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    replies: PropTypes.array.isRequired,
};

export default Comment;
