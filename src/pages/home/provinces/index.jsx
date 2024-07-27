import ProvinceItem from "@/components/home/Provinces/ProvinceItem";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Flex, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import provinces from "@/assets/images/city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function ProvincesPage() {
    const [provincesData, setProvincesData] = useState();
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        try {
            // Create a copy of the data array to avoid mutating the original array
            const sortedData = [...provinces].sort((a, b) =>
                a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
            );
            setProvincesData(sortedData);
        } catch (error) {
            console.log(error);
        }
    }, [setLoading]);
    return (
        <div className="w-full min-h-screen p-10">
            <Flex width={"100%"} justifyContent={"space-between"} gap={20} alignItems={"center"}>
                <h1 className="text-2xl font-bold font-poppins text-primary-200">Provinces</h1>
                <Flex
                    width={"300px"}
                    alignItems={"center"}
                    borderWidth={"2px"}
                    borderRadius={"full"}
                    padding={"3px 10px"}
                >
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                    <Input
                        placeholder="Search something..."
                        size="md"
                        border={"none"}
                        _focusVisible={{ border: "none" }}
                        onChange={(e) => {
                            const filteredData = [...provinces]
                                .sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }))
                                .filter((item) => item.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
                            setProvincesData(filteredData);
                        }}
                    />
                </Flex>
            </Flex>

            <SimpleGrid columns={[1, null, 3]} spacing="20px" marginTop={"30px"}>
                {provincesData?.map((item, index) => (
                    <GridItem key={index} height={"300px"}>
                        <ProvinceItem
                            description={item.desc}
                            thumbnailUrl={item.thumbnailUrl}
                            title={item.name}
                            code={item.code}
                        />
                    </GridItem>
                ))}
            </SimpleGrid>
        </div>
    );
}

export default ProvincesPage;
