import { Avatar, Button, Container, Flex, HStack, IconButton, Image, Input, Text, VStack } from "@chakra-ui/react";
import UpVoteIcon from "../icons/UpVote";
import DownVoteIcon from "../icons/DownVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faImage, faReply, faVideo } from "@fortawesome/free-solid-svg-icons";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";

function Comment({ _id, isCheckIn, user, content, imageUrls, videoUrls, upvoteCount, replies }) {
    const [showReply, setShowReply] = useState(false);
    const [repliesData, setRepliesData] = useState();
    const [showInputCommnet, setShowInputComment] = useState(false);
    useEffect(() => {
        setRepliesData(replies);
    }, [replies]);
    return (
        <Container maxW={"container.2xl"} padding={8}>
            <HStack alignItems={"flex-start"}>
                <Avatar src={user.imageUrl} />
                <VStack alignItems={"flex-start"} marginLeft={3}>
                    <Flex gap={4} alignItems={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"md"} className="text-primary-100 font-roboto">
                            {user.displayName}
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
                        {isCheckIn && (
                            <Flex gap={2}>
                                <UpVoteIcon />
                                <Text>{upvoteCount}</Text>
                                <DownVoteIcon />
                            </Flex>
                        )}
                        {isCheckIn && (
                            <Flex
                                alignItems={"center"}
                                gap={2}
                                cursor={"pointer"}
                                onClick={() => setShowInputComment(!showInputCommnet)}
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
                                width={"100%"}
                                type="text"
                                placeholder="Nhập bình luận"
                                border="none"
                                _focusVisible={{ border: "none" }}
                            />
                            <Flex gap={3}>
                                <IconButton icon={<FontAwesomeIcon icon={faImage} />} borderRadius={"full"} />
                                <IconButton icon={<FontAwesomeIcon icon={faVideo} />} borderRadius={"full"} />
                                <Button borderRadius={"full"} paddingX={8} colorScheme={"blue"}>
                                    Lưu
                                </Button>
                            </Flex>
                        </Flex>
                    )}
                    {repliesData && repliesData.length > 0 && (
                        <Flex
                            onClick={() => setShowReply(!showReply)}
                            cursor={"pointer"}
                            marginTop={2}
                            alignItems={"center"}
                            gap={2}
                        >
                            <Flex gap={2}>
                                <Text>Hiển thị phản hồi</Text>
                                <Text>({repliesData.length})</Text>
                            </Flex>
                            {showReply ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                        </Flex>
                    )}
                    {showReply &&
                        repliesData &&
                        repliesData.length > 0 &&
                        repliesData.map((comment) => <Comment {...comment} key={comment._id} />)}
                </VStack>
            </HStack>
        </Container>
    );
}
Comment.propTypes = {
    isCheckIn: PropTypes.bool,
    _id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    videoUrls: PropTypes.array.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    replies: PropTypes.array.isRequired,
};
export default Comment;
