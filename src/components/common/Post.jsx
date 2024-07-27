import {
    Avatar,
    Container,
    Flex,
    HStack,
    IconButton,
    Image,
    Input,
    Text,
    VisuallyHidden,
    VStack,
} from "@chakra-ui/react";
import { faArrowDown, faArrowUp, faImage, faPaperPlane, faReply, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import UpVoteIcon from "../icons/UpVote";
import DownVoteIcon from "../icons/DownVote";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import Comment from "./Comment";
import { getNewComment, postFuncPath as path } from "@/utils";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import reducer from "@/utils/vote";
import { LoadingContext } from "@/contexts/LoadingContext";
function Post({
    isCheckIn,
    store,
    experienceLocation,
    author,
    imageUrls,
    videoUrls,
    upvoteCount,
    content,
    id,
    comments,
}) {
    const { setLoading } = useContext(LoadingContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showBoxComment, setShowBoxComment] = useState(false);
    const [commentsData, setCommentsData] = useState();
    const [showInputCommnet, setShowInputComment] = useState(false);
    const imageInputRef = useRef();
    const videoInputRef = useRef();
    const [images, setImages] = useState();
    const [videos, setVideos] = useState();
    const [inputContent, setInputContent] = useState("");
    const [state, dispatch] = useReducer(reducer, { votes: upvoteCount, isUpvoted: false, isDownvoted: false });
    useEffect(() => {
        setCommentsData(comments);
    }, [comments]);
    const handleComment = async () => {
        if (inputContent) {
            try {
                setLoading(true);
                const url = path.addComment(id);
                const formData = new FormData();
                if (images) {
                    const imagesData = Array.from(images);
                    imagesData.forEach((image) => formData.append("images", image));
                }
                if (videos) {
                    const videoData = Array.from(videos);
                    videoData.forEach((video) => formData.append("videos", video));
                }
                formData.append("content", inputContent);
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: formData,
                });
                const dataRes = await res.json();
                if (res.ok) {
                    const newComment = getNewComment(auth.user, dataRes);
                    setCommentsData((prev) => {
                        if (!Array.isArray(prev)) {
                            prev = [];
                        }
                        return [newComment, ...prev];
                    });
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <Container maxW={"container.2xl"} padding={8}>
            <VisuallyHidden>
                <Input type={"file"} onChange={(e) => setImages(e.target.files)} multiple ref={imageInputRef} />
                <Input type={"file"} onChange={(e) => setVideos(e.target.files)} multiple ref={videoInputRef} />
            </VisuallyHidden>
            <HStack alignItems={"flex-start"}>
                <Avatar src={author.imageUrl} />
                <VStack alignItems={"flex-start"} marginLeft={3}>
                    <Flex gap={4} alignItems={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"md"} className="text-primary-100 font-roboto">
                            {author.displayName}
                        </Text>
                        <Text fontSize={"sm"} color={"gray.600"}>
                            {content}
                        </Text>
                    </Flex>
                    {store && <Text fontWeight={"semibold"}>{store.name}</Text>}
                    {experienceLocation && <Text fontWeight={"semibold"}>{experienceLocation.locationName}</Text>}
                    <Flex gap={4}>
                        {imageUrls &&
                            imageUrls.length > 0 &&
                            imageUrls.map((url, index) => (
                                <Image
                                    marginY={3}
                                    cursor={"pointer"}
                                    onClick={() => window.open(url)}
                                    key={index}
                                    src={url}
                                    width={"130px"}
                                    height={"100px"}
                                    borderRadius={"lg"}
                                />
                            ))}
                        {videoUrls &&
                            videoUrls.length > 0 &&
                            videoUrls.map((url, index) => (
                                <video
                                    className="my-4"
                                    key={index}
                                    width="150px"
                                    height="130px"
                                    controls
                                    onClick={() => window.open(url)}
                                >
                                    <source src={url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                    </Flex>
                    <Flex alignItems={"center"} gap={4}>
                        <Flex gap={2}>
                            <UpVoteIcon
                                onClick={() => dispatch({ type: "upvote" })}
                                fill={state.isUpvoted ? "red" : null}
                            />
                            <Text>{state.votes}</Text>
                            <DownVoteIcon
                                onClick={() => dispatch({ type: "downvote" })}
                                fill={state.isDownvoted ? "red" : null}
                            />
                        </Flex>
                        {isCheckIn && (
                            <Flex
                                cursor={"pointer"}
                                alignItems={"center"}
                                gap={2}
                                onClick={() => {
                                    if (auth.token) {
                                        setShowInputComment(!showInputCommnet);
                                    } else {
                                        navigate("/auth/sign-in");
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faReply} />
                                <Text>Phản hồi</Text>
                            </Flex>
                        )}
                    </Flex>
                    {showInputCommnet && (
                        <Flex
                            marginTop={4}
                            border={"1px solid gray"}
                            padding={2}
                            borderRadius={"full"}
                            gap={2}
                            width={"500px"}
                        >
                            <Input
                                onChange={(e) => setInputContent(e.target.value)}
                                width={"100%"}
                                type="text"
                                placeholder="Nhập bình luận"
                                border="none"
                                _focusVisible={{ border: "none" }}
                            />
                            <Flex gap={3}>
                                <IconButton
                                    backgroundColor={"white"}
                                    onClick={() => imageInputRef.current.click()}
                                    icon={<FontAwesomeIcon icon={faImage} />}
                                    borderRadius={"full"}
                                />
                                <IconButton
                                    backgroundColor={"white"}
                                    onClick={() => videoInputRef.current.click()}
                                    icon={<FontAwesomeIcon icon={faVideo} />}
                                    borderRadius={"full"}
                                />
                                <IconButton
                                    icon={<FontAwesomeIcon icon={faPaperPlane} />}
                                    onClick={handleComment}
                                    borderRadius={"full"}
                                    paddingX={8}
                                    colorScheme={"blue"}
                                >
                                    Lưu
                                </IconButton>
                            </Flex>
                        </Flex>
                    )}
                    {commentsData && commentsData.length > 0 && (
                        <Flex
                            onClick={() => setShowBoxComment(!showBoxComment)}
                            cursor={"pointer"}
                            marginTop={2}
                            alignItems={"center"}
                            gap={2}
                        >
                            <Flex gap={2}>
                                <Text>Hiển thị phản hồi</Text>
                                <Text>({commentsData.length})</Text>
                            </Flex>
                            {showBoxComment ? (
                                <FontAwesomeIcon icon={faArrowUp} />
                            ) : (
                                <FontAwesomeIcon icon={faArrowDown} />
                            )}
                        </Flex>
                    )}
                    {showBoxComment &&
                        commentsData &&
                        commentsData.length > 0 &&
                        commentsData.map((comment) => <Comment isCheckIn={isCheckIn} {...comment} key={comment._id} />)}
                </VStack>
            </HStack>
        </Container>
    );
}
Post.propTypes = {
    experienceLocation: PropTypes.object,
    store: PropTypes.object,
    isCheckIn: PropTypes.bool,
    author: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        badges: PropTypes.array.isRequired,
    }).isRequired,
    content: PropTypes.string,
    imageUrls: PropTypes.array,
    videoUrls: PropTypes.array,
    upvoteCount: PropTypes.number,
    id: PropTypes.string,
    comments: PropTypes.array,
};
export default Post;
