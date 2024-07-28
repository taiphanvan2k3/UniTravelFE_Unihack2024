import { Avatar, Button, Container, Flex, HStack, IconButton, Image, Input, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faImage, faPaperPlane, faReply, faVideo } from "@fortawesome/free-solid-svg-icons";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import UpVoteIcon from "@/components/icons/UpVote";
import DownVoteIcon from "@/components/icons/DownVote";
import ReplyStore from "./ReplyStore";

function CommentStore({ author, store, content, imageUrls, videoUrls, comments, upvoteCount, _id }) {
    const [showReply, setShowReply] = useState(false);
    const [showInputCommnet, setShowInputComment] = useState(false);
    return (
        <Container maxW={"container.2xl"} padding={8}>
            <HStack alignItems={"flex-start"}>
                <Avatar src={author.imageUrl} />
                <VStack alignItems={"flex-start"} marginLeft={3}>
                    <Flex gap={4} alignItems={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"md"} className="text-primary-100 font-roboto">
                            {author.displayName}
                        </Text>
                        <Text fontSize={"sm"} color={"gray.500"}>
                            {content}
                        </Text>
                    </Flex>
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
                            <UpVoteIcon />
                            <Text>{upvoteCount}</Text>
                            <DownVoteIcon />
                        </Flex>
                        <Flex
                            alignItems={"center"}
                            gap={2}
                            cursor={"pointer"}
                            onClick={() => setShowInputComment(!showInputCommnet)}
                        >
                            <FontAwesomeIcon icon={faReply} />
                            <Text>Phản hồi</Text>
                        </Flex>
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
                                width={"100%"}
                                type="text"
                                placeholder="Nhập bình luận"
                                border="none"
                                _focusVisible={{ border: "none" }}
                            />
                            <Flex gap={3}>
                                <IconButton
                                    backgroundColor={"white"}
                                    icon={<FontAwesomeIcon icon={faImage} />}
                                    borderRadius={"full"}
                                />
                                <IconButton
                                    backgroundColor={"white"}
                                    icon={<FontAwesomeIcon icon={faVideo} />}
                                    borderRadius={"full"}
                                />
                                <IconButton
                                    icon={<FontAwesomeIcon icon={faPaperPlane} />}
                                    borderRadius={"full"}
                                    paddingX={8}
                                    colorScheme={"blue"}
                                />
                            </Flex>
                        </Flex>
                    )}
                    {comments && comments.length > 0 && (
                        <Flex
                            onClick={() => setShowReply(!showReply)}
                            cursor={"pointer"}
                            marginTop={2}
                            alignItems={"center"}
                            gap={2}
                        >
                            <Flex gap={2}>
                                <Text>Hiển thị phản hồi</Text>
                                <Text>({comments.length})</Text>
                            </Flex>
                            {showReply ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                        </Flex>
                    )}
                    {showReply &&
                        comments &&
                        comments.length > 0 &&
                        comments.map((comment) => <ReplyStore {...comment} key={comment._id} />)}
                </VStack>
            </HStack>
        </Container>
    );
}
CommentStore.propTypes = {
    author: PropTypes.object,
    store: PropTypes.object,
    imageUrls: PropTypes.array,
    videoUrls: PropTypes.array,
    comments: PropTypes.array,
    upvoteCount: PropTypes.number,
    content: PropTypes.string,
    _id: PropTypes.string,
};
export default CommentStore;
