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
                gap={6}
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
                        height={"350px"}
                        className="hover:scale-105 duration-300 ease-in-out cursor-pointer"
                    >
                        <Stack>
                            <Image borderRadius={"lg"} height={"200px"} width={"100%"} src={item?.thumbnailUrl} />
                            <Flex flexDirection={"column"} minHeight={"100px"} justifyContent={"space-between"}>
                                <Text fontWeight={"semibold"}>{item?.locationName}</Text>
                                <Flex marginTop={"10px"}>
                                    <Text>
                                        Discount Price :{" "}
                                        <span className="font-bold text-white p-2 bg-sky-300 rounded-lg">
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
