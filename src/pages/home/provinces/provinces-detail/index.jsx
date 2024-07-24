import useLocation from "@/hooks/useLocation";
import useProvince from "@/hooks/useProvince";
import { formatPrice } from "@/utils";
import { Container, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

function ProvinceDetailPage() {
    const { code } = useParams();
    const { location } = useProvince({ code });
    const { setLocation } = useLocation();
    const navigate = useNavigate();
    return (
        <>
            <Grid
                templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
                gap={16}
                padding={"10px"}
            >
                {location?.map((item, index) => (
                    <Container
                        onClick={() => {
                            setLocation(item);
                            navigate("/provinces/" + code + "/location");
                        }}
                        key={index}
                        justifyContent={"center"}
                        boxShadow={"lg"}
                        borderRadius={"lg"}
                        padding={"10px"}
                        height={"400px"}
                        className="hover:scale-105 duration-300 ease-in-out cursor-pointer bg-secondary"
                    >
                        <Stack>
                            <Image borderRadius={"lg"} height={"250px"} width={"100%"} src={item?.thumbnailUrl} />
                            <Flex flexDirection={"column"} minHeight={"100px"} justifyContent={"space-around"}>
                                <Text fontWeight={"semibold"} fontFamily={"roboto"} className="text-black">
                                    {item?.locationName}
                                </Text>
                                <Flex marginTop={"4px"}>
                                    <Text className="font-roboto font-medium text-black">
                                        Discount Price :{" "}
                                        <span className="font-bold text-white p-2 bg-primary-100 rounded-lg">
                                            {formatPrice(item.price.discountedPrice)}
                                        </span>
                                    </Text>
                                </Flex>
                            </Flex>
                        </Stack>
                    </Container>
                ))}
            </Grid>
        </>
    );
}

export default ProvinceDetailPage;
