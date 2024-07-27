import { getProvincesName } from "@/utils";
import { Flex, Grid, GridItem, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { faCity, faClock, faLocationDot, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
function StoreCard({ detailAddress, openingHours, province, name, _id, thumbnailUrl }) {
    const provinceName = getProvincesName(province);
    const navigate = useNavigate();
    return (
        <VStack
            _hover={{ boxShadow: "2xl", transitionDuration: "0.5s" }}
            borderRadius={"lg"}
            boxShadow={"lg"}
            padding={4}
        >
            <Grid width={"100%"} templateColumns={["repeat(4, 1fr)"]} templateRows={["repeat(2, 1fr)"]}>
                <GridItem colSpan={2} rowSpan={2}>
                    <Stack height={"100%"} justifyContent={"space-between"} padding={2}>
                        <Flex>
                            <FontAwesomeIcon
                                cursor={"pointer"}
                                icon={faShop}
                                onClick={() => {
                                    navigate(`/store/${_id}`);
                                }}
                            />
                        </Flex>
                        <Text
                            className="text-primary-100 font-roboto"
                            fontWeight={"bold"}
                            fontSize={"xl"}
                            marginBottom={5}
                        >
                            {name}
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={2} rowSpan={2} padding={2}>
                    <Image width={"100%"} borderRadius={"lg"} height={"200px"} src={thumbnailUrl} />
                </GridItem>
                <GridItem
                    colSpan={4}
                    rowSpan={2}
                    width={"100%"}
                    padding={4}
                    className="bg-primary-500"
                    borderRadius={"lg"}
                >
                    <Flex justifyContent={"space-between"} marginBottom={3} alignItems={"center"}>
                        <FontAwesomeIcon icon={faClock} />
                        <Text>{openingHours}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} marginBottom={3}>
                        <FontAwesomeIcon icon={faCity} />
                        <Text>{provinceName}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} marginBottom={3}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Text>{detailAddress}</Text>
                    </Flex>
                </GridItem>
            </Grid>
        </VStack>
    );
}
StoreCard.propTypes = {
    detailAddress: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrls: PropTypes.array,
    openingHours: PropTypes.string,
    province: PropTypes.string,
    videoUrls: PropTypes.array,
    name: PropTypes.string,
    _id: PropTypes.string,
};
export default StoreCard;
