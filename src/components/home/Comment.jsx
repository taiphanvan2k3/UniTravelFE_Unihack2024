import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function Comment({ avatar, reviewerName, score, reviewText, reviewPhotos }) {
    return (
        <Stack
            marginBottom={"10px"}
            padding={"20px"}
            className="hover:scale-95 duration-300 ease-in-out cursor-pointer"
        >
            <Flex width={"100%"}>
                <Flex flexDirection="column" height={"100%"} justifyContent={"start"}>
                    <Image width={"50px"} src={avatar} borderRadius={"full"} />
                </Flex>
                <Stack width={"100%"}>
                    <Stack width={"100%"} marginLeft={"10px"}>
                        <Flex width={"100%"} justifyContent={"space-between"}>
                            <Text fontWeight={"semibold"}>{reviewerName}</Text>
                            <Flex gap={3}>
                                <Text fontWeight={"semibold"}>{score}</Text>
                                <FontAwesomeIcon icon={faStar} className="text-yellow-400 size-6" />
                            </Flex>
                        </Flex>
                        <Text textAlign={"justify"}>{reviewText}</Text>
                    </Stack>
                    <Flex gap={4} marginLeft={"10px"}>
                        {reviewPhotos &&
                            reviewPhotos.map((photo, index) => (
                                <Link to={photo.photoUrl} key={index}>
                                    <Image src={photo.photoUrl} width={"100px"} height={"100px"} borderRadius={"lg"} />
                                </Link>
                            ))}
                    </Flex>
                </Stack>
            </Flex>
        </Stack>
    );
}

Comment.propTypes = {
    avatar: PropTypes.string.isRequired,
    reviewerName: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    reviewText: PropTypes.string.isRequired,
    reviewPhotos: PropTypes.arrayOf(
        PropTypes.shape({
            photoUrl: PropTypes.string.isRequired,
        })
    ),
};
export default Comment;
