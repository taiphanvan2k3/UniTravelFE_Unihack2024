import { Container, HStack, VStack, Avatar, Text, Flex, Input, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faComment } from "@fortawesome/free-solid-svg-icons";

function Comment({ user, content }) {
    const [showBoxComment, setShowBoxComment] = useState(false);
    return (
        <Container maxW={"container.2xl"} padding={"25px 20px"} borderRadius={"lg"}>
            <HStack align="start">
                <Avatar name={user?.displayName} src={user?.imageUrl} />
                <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">{user?.displayName}</Text>
                    <Text>{content}</Text>
                    <HStack spacing={4}>
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
                                width={"500px"}
                                border={"none"}
                                _focusVisible="none"
                                height={"50px"}
                            />
                            <Button borderRadius={"full"} paddingX={7} colorScheme={"blue"} height={"50px"}>
                                Save
                            </Button>
                        </Flex>
                    )}
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
