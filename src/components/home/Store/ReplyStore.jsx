import { Avatar, Container, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import UpVoteIcon from "@/components/icons/UpVote";
import DownVoteIcon from "@/components/icons/DownVote";

function ReplyStore({ user, content, imageUrls, videoUrls, upvoteCount, _id }) {
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
                        <Flex gap={2}>
                            <UpVoteIcon />
                            <Text>{upvoteCount}</Text>
                            <DownVoteIcon />
                        </Flex>
                    </Flex>
                </VStack>
            </HStack>
        </Container>
    );
}
ReplyStore.propTypes = {
    user: PropTypes.object,
    imageUrls: PropTypes.array,
    videoUrls: PropTypes.array,
    comments: PropTypes.array,
    upvoteCount: PropTypes.number,
    content: PropTypes.string,
    _id: PropTypes.string,
};
export default ReplyStore;
