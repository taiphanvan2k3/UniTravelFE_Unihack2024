import Hero from "@/components/home/Hero";
import { Card, CardBody, Flex, Image, Container, Text, Center, SimpleGrid, Stack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { japan, chinese, korea, vietnam } from "@/assets/images";
import { faArrowRightLong, faArrowUp, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
function HomePage() {
    console.log("Home Page re-render");
    const destination = [
        {
            image: japan,
            title: "Japan",
            price: "299",
            days: "7 days trip",
        },
        {
            image: chinese,
            title: "China",
            price: "299",

            days: "7 days trip",
        },
        {
            image: korea,
            title: "Korea",
            price: "299",

            days: "7 days trip",
        },
        {
            image: vietnam,
            title: "Vietnam",
            price: "299",

            days: "7 days trip",
        },
    ];
    return (
        <div>
            <Hero />
            <Container justifyContent={"center"} marginTop={"20px"} marginBottom={"20px"}>
                <Center>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                        Popular 
                    </Text>
                </Center>
            </Container>
            <div className="p-10">
                <SimpleGrid columns={[2, null, 4]} spacing="20px">
                   
                </SimpleGrid>
                <Center margin={"30px"}>
                    <button className=" bg-white px-6 py-4 rounded-full text-sky-400 font-bold border-2 border-sky-400 duration-300 ease-in-out hover:bg-sky-300 hover:text-white">
                        View All Country
                        <span className="ml-4 h-auto">
                            <FontAwesomeIcon icon={faArrowRightLong} />
                        </span>
                    </button>
                </Center>
                <Flex marginTop={"20px"} marginBottom={"20px"} justifyContent={"space-between"}>
                    <Stack>
                        <Text fontWeight={"bold"} fontSize={"3xl"}>
                            Popular Destination
                        </Text>
                        <Text fontSize={"md"}>Popular Destination in vietnamese</Text>
                    </Stack>
                </Flex>

                <SimpleGrid columns={[1, null, 3]} spacing="30px">
                    {destination.map((item, index) => (
                        <div key={index} className="rounded-xl shadow-xl h-96">
                            <Image src={item.image} className="w-full h-72 rounded-t-xl" />
                            <Flex padding={"20px"} justifyContent={"space-between"}>
                                <Stack>
                                    <Text fontWeight={"bold"} fontSize={"lg"}>
                                        {item.title}
                                    </Text>
                                    <Text fontSize={"md"} fontWeight={"bold"} textColor={"blue.400"}>
                                        ${item.price}
                                    </Text>
                                </Stack>
                                <Stack justifyContent={"end"}>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FontAwesomeIcon icon={faArrowUp} />
                                        <Text>{item.days}</Text>
                                    </Flex>
                                </Stack>
                            </Flex>
                        </div>
                    ))}
                </SimpleGrid>
            </div>
        </div>
    );
}

export default HomePage;
