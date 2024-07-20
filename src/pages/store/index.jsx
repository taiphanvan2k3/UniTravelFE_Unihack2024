import { store } from "@/assets/images";
import { ROUTE_CONSTANTS } from "@/constants/routes";
import { AuthContext } from "@/contexts/AuthContext";
import { Box, Button, Flex, Grid, GridItem, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stores } from "@/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
function StorePage() {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState(stores);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(auth?.user?.roles && auth.user.roles.includes("store-owner"))) {
            navigate(ROUTE_CONSTANTS.HOME_PAGE);
        }
    }, [auth, navigate]);
    if (auth?.user?.roles && auth.user.roles.includes("store-owner")) {
        return (
            <Grid templateColumns={"repeat(12, 1fr)"} width={"100%"} padding={"40px"} gap={18}>
                <GridItem colSpan={5}>
                    <Flex justifyContent={"flex-start"} gap={8}>
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                            Your Store
                        </Text>
                        <IconButton>
                            <FontAwesomeIcon icon={faShop} />
                        </IconButton>
                    </Flex>
                </GridItem>
                <GridItem colSpan={5}></GridItem>
                {data.map((item, index) => (
                    <GridItem key={index} colSpan={3} height={"300px"}>
                        <Stack
                            borderRadius={"2xl"}
                            boxShadow={"xl"}
                            padding={"20px"}
                            className="hover:scale-105 duration-300 ease-in-out cursor-pointer"
                        >
                            <Image width={"100%"} borderRadius={"lg"} height={"250px"} src={item.thumbnailUrl} />
                            <Flex justifyContent={"space-between"} marginTop={4}>
                                <Text fontWeight={"bold"} fontSize={"lg"}>
                                    {item.name}
                                </Text>
                                <Text color={"gray.500"} fontSize={"md"}>
                                    {item.province}
                                </Text>
                            </Flex>
                            <Text fontWeight={"semibold"}>Địa chỉ: {item.detailAddress}</Text>
                            <Flex justifyContent={"space-between"} alignItems={"center"} marginTop={4}>
                                <Text color={"blue.300"} fontWeight={"bold"}>
                                    Open: {item.openingHours}h
                                </Text>
                                <Button borderColor={"black"} borderWidth={"2px"} padding={"0 30px"} variant="outline">
                                    View
                                </Button>
                            </Flex>
                        </Stack>
                    </GridItem>
                ))}
            </Grid>
        );
    }
    return null;
}

export default StorePage;
