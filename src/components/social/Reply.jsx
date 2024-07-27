import { Container, HStack, VStack, Avatar, Text, Box, Flex, Input, Button, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";
import UpVoteIcon from "../icons/UpVote";
import DownVoteIcon from "../icons/DownVote";
import { useReducer } from "react";
import reducer from "@/utils/vote";
import { DefaultAvatar01 } from "@/assets/images";

function Reply({ postId, _id, user, content, imageUrls, videoUrls, upvoteCount, replies }) {
    const [state, dispatch] = useReducer(reducer, { votes: upvoteCount, isUpvoted: false, isDownvoted: false });
    return (
        <Container maxW={"container.2xl"} padding={"25px 20px"} borderRadius={"lg"}>
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
                        </Flex>
                    </HStack>
                </VStack>
            </HStack>
        </Container>
    );
}

Reply.propTypes = {
    postId: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    videoUrls: PropTypes.array.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    replies: PropTypes.array.isRequired,
};

export default Reply;
