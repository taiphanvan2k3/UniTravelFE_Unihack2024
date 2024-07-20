import ProvinceItem from "@/components/home/Provinces/ProvinceItem";
import { LoadingContext } from "@/contexts/LoadingContext";
import { callAPI } from "@/services/api.service";
import { Box, Flex, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import data from "@/assets/images/city";
function ProvincesPage() {
    const [provinces, setProvinces] = useState(data);
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        try {
            const sortedData = data.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
            setProvinces(sortedData);
        } catch (error) {
            console.log(error);
        }
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
                        <ProvinceItem thumbnailUrl={item.thumbnailUrl} title={item.name} code={item.code} />
                    </GridItem>
                ))}
            </SimpleGrid>
        </div>
    );
}

export default ProvincesPage;
