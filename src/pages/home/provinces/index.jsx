import ProvinceItem from "@/components/home/ProvinceItem";
import { Box, Container, Flex, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ProvincesPage() {
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_PROVINCES_URL}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
                setProvinces(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProvinces();
    }, []);
    return (
        <div className="w-full min-h-screen p-10">
            <Flex width={"100%"} justifyContent={"start"} gap={20} alignItems={"center"}>
                <h1 className="text-2xl font-bold">Provinces</h1>
                <Box>
                    <Input
                        placeholder="Search something..."
                        size="md"
                        border={"none"}
                        _focusVisible={{ border: "none" }}
                    />
                </Box>
            </Flex>
            <SimpleGrid columns={[1, null, 4]} spacing="20px" marginTop={"30px"}>
                {provinces.map((item, index) => (
                    <GridItem key={index} height={"300px"}>
                        <ProvinceItem title={item.name} />
                    </GridItem>
                ))}
            </SimpleGrid>
        </div>
    );
}

export default ProvincesPage;
