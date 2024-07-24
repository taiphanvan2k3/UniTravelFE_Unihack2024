import Hero from "@/components/home/Hero";
import { Flex, Image, Container, Text, Center, SimpleGrid, Stack, GridItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { callAPI } from "@/services/api.service";
import { LoadingContext } from "@/contexts/LoadingContext";
import { formatPrice } from "@/utils";
function HomePage() {
    const [topLocation, setTopLocation] = useState([]);
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        const fetchData = async () => {
            const url = `${import.meta.env.VITE_PROVINCES_EXPERIENCE_LOCATIONS}/top?limit=10`;
            const responseData = await callAPI(url, "GET", null, {}, setLoading);
            setTopLocation(responseData);
        };
        fetchData();
    }, [setLoading]);
    return (
        <div>
            <Hero />
            <Container justifyContent={"center"} marginTop={"20px"} marginBottom={"20px"}>
                <Center>
                    <Text className="font-roboto text-primary-100" fontSize={"3xl"} fontWeight={"bold"}>
                        Top 10 locations
                    </Text>
                </Center>
            </Container>
            <div className="p-10">
                <SimpleGrid columns={[1, 2, null, 4]} spacing="20px">
                    {topLocation.map((item, index) => (
                        <GridItem key={index} height={"full"}>
                            <Container
                                key={index}
                                justifyContent={"center"}
                                boxShadow={"md"}
                                borderRadius={"lg"}
                                padding={"10px"}
                                height={"400px"}
                                className="hover:scale-105 duration-300 ease-in-out cursor-pointer"
                            >
                                <Stack>
                                    <Image
                                        borderRadius={"lg"}
                                        height={"250px"}
                                        width={"100%"}
                                        src={item?.thumbnailUrl}
                                    />
                                    <Flex flexDirection={"column"} minHeight={"100px"} justifyContent={"space-between"}>
                                        <Text fontWeight={"semibold"}>{item?.locationName}</Text>
                                        <Flex marginTop={"10px"}>
                                            <Text className="font-roboto font-medium">
                                                Discount Price :{" "}
                                                <span className="font-bold  text-white p-2 bg-primary-100 rounded-lg">
                                                    {formatPrice(item.price.discountedPrice)}
                                                </span>
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Stack>
                            </Container>
                        </GridItem>
                    ))}
                </SimpleGrid>
                {/* <Center margin={"30px"}>
                    <button className=" bg-white px-6 py-4 rounded-full text-primary-200 font-bold border-2 border-primary-200 duration-300 ease-in-out hover:bg-primary-100 hover:text-white">
                        View All
                        <span className="ml-4 h-auto">
                            <FontAwesomeIcon icon={faArrowRightLong} />
                        </span>
                    </button>
                </Center> */}
            </div>
        </div>
    );
}

export default HomePage;
