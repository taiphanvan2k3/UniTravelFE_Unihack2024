import { Button, Container, Flex, IconButton, Image, Input, Text, VisuallyHidden, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { PropTypes } from "prop-types";
import { useContext, useReducer, useRef, useState } from "react";
import reducer from "@/utils/vote";
import UpVoteIcon from "@/components/icons/UpVote";
import DownVoteIcon from "@/components/icons/DownVote";
import Comment from "./Comment";
import { AuthContext } from "@/contexts/AuthContext";
function Post({ id, author, content, imageUrls, upvoteCount, comments, sampleComments }) {
    const { auth } = useContext(AuthContext);
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
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("content", newComment);
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
        } catch (error) {
            throw new Error(error);
        }
    };
    const [state, dispatch] = useReducer(reducer, { votes: upvoteCount, isUpvoted: false, isDownvoted: false });
    return (
        <Container marginTop={5} boxShadow={"lg"} borderRadius={"lg"} maxW={"container.2xl"} padding={"30px"}>
            <VisuallyHidden>
                <Input multiple onChange={handleImageChange} ref={imageInputRef} type={"file"} name="image" />
            </VisuallyHidden>
            <VisuallyHidden>
                <Input multiple onChange={handleVideoChange} ref={videoInputRef} type={"file"} name="video" />
            </VisuallyHidden>
            <Flex>
                <Image width={"50px"} borderRadius={"full"} src={author.imageUrl} />
                <VStack alignItems={"start"} marginLeft={5}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                        {author.displayName}
                    </Text>
                </VStack>
            </Flex>
            <Text marginTop={5}>{content}</Text>
            <Flex marginTop={"20px"} gap={5} flexWrap={"wrap"}>
                {Array.isArray(imageUrls)
                    ? imageUrls.map((url, index) => (
                          <Image borderRadius={"xl"} key={index} width={"200px"} height={"200px"} src={url} />
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
                <Flex alignItems={"center"} gap={3} padding={4} backgroundColor={"gray.200"} borderRadius={"2xl"}>
                    <FontAwesomeIcon size="lg" color="gray" icon={faComment} />
                    <Text fontWeight={"bold"}>{comments}</Text>
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
                justifyContent={"space-between"}
            >
                <Input
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    width={"100%"}
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
                <Button borderRadius={"full"} paddingX={7} colorScheme={"blue"} height={"50px"} onClick={handleSubmit}>
                    Save
                </Button>
            </Flex>
            {sampleComments.map((comment) => (
                <Comment user={comment.user} content={comment.content} key={comment["_id"]} />
            ))}
        </Container>
    );
}
Post.propTypes = {
    id: PropTypes.string,
    author: PropTypes.object,
    content: PropTypes.string,
    imageUrls: PropTypes.array,
    upvoteCount: PropTypes.number,
    comments: PropTypes.number,
    sampleComments: PropTypes.array,
};
export default Post;
