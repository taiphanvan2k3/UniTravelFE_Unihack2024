import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    IconButton,
    Image,
    Input,
    Text,
    VisuallyHidden,
    VStack,
} from "@chakra-ui/react";
import UpVoteIcon from "../icons/UpVote";
import DownVoteIcon from "../icons/DownVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { PropTypes } from "prop-types";
import { useContext, useReducer, useRef, useState } from "react";
import Comment from "./Comment";
import reducer from "@/utils/vote";
import { AuthContext } from "@/contexts/AuthContext";
function PostCard({
    id,
    store,
    author,
    imageUrls,
    content,
    videoUrls,
    comments,
    upvoteCount,
    upvoteUsers,
    downvoteUsers,
    experienceLocation,
}) {
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [imagesFile, setImagesFile] = useState([]);
    const [videosFile, setVideosFile] = useState([]);
    const { auth } = useContext(AuthContext);
    const [commentInput, setCommentInput] = useState();
    const [state, dispatch] = useReducer(reducer, { votes: upvoteCount, isUpvoted: false, isDownvoted: false });
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
    const handleAddComment = async () => {
        try {
            if (commentInput && commentInput.length > 0) {
                const formData = new FormData();
                formData.append("content", commentInput);
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
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_POSTS_URL}/${id}/add-comment`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                        body: formData,
                    }
                );
                if (!res.ok) {
                    console.log("Failed to add comment");
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <Container marginTop={5} boxShadow={"lg"} borderRadius={"lg"} maxW={"container.2xl"} padding={"30px"}>
            <VisuallyHidden>
                <Input multiple onChange={handleImageChange} ref={imageInputRef} type={"file"} name="image" />
            </VisuallyHidden>
            <VisuallyHidden>
                <Input multiple onChange={handleVideoChange} ref={videoInputRef} type={"file"} name="video" />
            </VisuallyHidden>
            <Flex>
                <Box position={"relative"}>
                    <Avatar size={"lg"} src={author.imageUrl} />
                    <Image
                        position={"absolute"}
                        top={0}
                        right={0}
                        width={"24px"}
                        borderRadius={"full"}
                        src={author.badges[0].imageUrl}
                    />
                </Box>
                <VStack alignItems={"start"} marginLeft={5}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                        {author.displayName}
                    </Text>
                    <Text fontWeight={"semibold"} fontSize={"md"}>
                        {store === undefined
                            ? `${experienceLocation.locationName}-${experienceLocation.address}`
                            : `${store.name}`}
                    </Text>
                </VStack>
            </Flex>
            <Text marginTop={5}>{content}</Text>
            <Flex marginTop={"20px"} gap={5} flexWrap={"wrap"}>
                {Array.isArray(imageUrls)
                    ? imageUrls?.map((url, index) => (
                          <Image borderRadius={"xl"} key={index} width={"170px"} height={"200px"} src={url} />
                      ))
                    : null}
                {Array.isArray(videoUrls)
                    ? videoUrls?.map((url, index) => (
                          <video key={index} src={url} width={"170px"} height={"250px"} controls />
                      ))
                    : null}
            </Flex>
            <Flex marginTop={"30px"} gap={5} alignItems={"center"}>
                <Flex padding={4} borderRadius={"2xl"} backgroundColor={"gray.200"} gap={3} alignItems={"center"}>
                    <UpVoteIcon
                        onClick={() => dispatch({ type: "upvote" })}
                        fill={state.isUpvoted ? "#0091FF" : "#000000"}
                    />
                    <Text fontWeight={"bold"}>{state.votes}</Text>
                    <DownVoteIcon
                        onClick={() => {
                            if (state.votes != 0) {
                                dispatch({ type: "downvote" });
                            }
                        }}
                        fill={state.isDownvoted ? "#0091FF" : "#000000"}
                    />
                </Flex>
            </Flex>
            <Flex
                alignItems={"center"}
                gap={5}
                border={"2px"}
                borderRadius={"full"}
                borderColor={"gray.200"}
                padding={1}
                marginTop={"25px"}
                justifyContent={"flex-end"}
            >
                <Input
                    placeholder="Add a comment"
                    width={"100%"}
                    border={"none"}
                    _focusVisible="none"
                    height={"50px"}
                    onChange={(e) => setCommentInput(e.target.value)}
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
                    onClick={handleAddComment}
                >
                    Save
                </Button>
            </Flex>
            {Array.isArray(comments) && comments.length > 0
                ? comments.map((comment) => <Comment key={comment.id} postId={id} {...comment} />)
                : null}
        </Container>
    );
}
PostCard.propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    store: PropTypes.object,
    imageUrls: PropTypes.array.isRequired,
    videoUrls: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    upvoteUsers: PropTypes.array.isRequired,
    downvoteUsers: PropTypes.array.isRequired,
    experienceLocation: PropTypes.object,
};

export default PostCard;
