import StoreCard from "@/components/home/Store/StoreCard";
import { useStoreByProvinceId, useStoreNearBy } from "@/hooks";
import useLocationGeo from "@/hooks/useLocationGeo";
import { getProvinces } from "@/utils";
import { Button, Container, Flex, Grid, GridItem, HStack, Image, Select, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

function FindStorePage() {
    const provinces = getProvinces();
    const { location } = useLocationGeo();
    const storesNearBy = useStoreNearBy(location.latitude, location.longitude, 10, "all");
    const [provinceId, setProvinceId] = useState(null);
    const stores = useStoreByProvinceId(provinceId);
    const [showNearBy, setShowNearBy] = useState(null);
    console.log(stores);
    return (
        <Container maxW={"container.2xl"} padding={"30px"}>
            <Flex width={"100%"} justifyContent={"flex-end"} gap={20}>
                <HStack>
                    <Select
                        placeholder="Select province"
                        width={"200px"}
                        onChange={(e) => {
                            setProvinceId(e.target.value);
                            setShowNearBy(false);
                        }}
                    >
                        {provinces.map((province) => (
                            <option key={province.code} value={province.id}>
                                {province.name}
                            </option>
                        ))}
                    </Select>
                    <Button colorScheme="blue">Find Nearby</Button>
                </HStack>
            </Flex>
            <Grid templateColumns={["repeat(4, 1fr)"]} gap={4}>
                {stores?.map((store) => (
                    <GridItem key={store._id} colSpan={1}>
                        <StoreCard {...store} />
                    </GridItem>
                ))}
            </Grid>
        </Container>
    );
}

export default FindStorePage;
