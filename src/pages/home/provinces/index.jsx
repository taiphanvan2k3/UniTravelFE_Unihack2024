import ProvinceItem from "@/components/home/Provinces/ProvinceItem";
import { LoadingContext } from "@/contexts/LoadingContext";
import { callAPI } from "@/services/api.service";
import { Box, Flex, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

function ProvincesPage() {
    const [provinces, setProvinces] = useState([]);
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const url = `${import.meta.env.VITE_PROVINCES_URL}`;
                const responseData = await callAPI(url, "GET", null, {}, setLoading);
                const sortedData = responseData.sort((a, b) =>
                    a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
                );
                setProvinces(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProvinces();
    }, [setLoading]);
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
                        <ProvinceItem title={item.name} code={item.code} />
                    </GridItem>
                ))}
            </SimpleGrid>
        </div>
    );
}

export default ProvincesPage;
