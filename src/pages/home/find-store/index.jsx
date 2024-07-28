import { Container, Flex, Grid, GridItem, IconButton, Select } from "@chakra-ui/react";
import provinces from "@/assets/images/city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useStoreByProvinceId, useStoreNearBy } from "@/hooks";
import { useState } from "react";
import { getProvinces } from "@/utils";
import useLocationGeo from "@/hooks/useLocationGeo";
import StoreCard from "@/components/home/Store/StoreCard";
function FindStorePage() {
    const provinces = getProvinces();
    const [provinceId, setProvinceId] = useState(null);
    const { location } = useLocationGeo();
    const storesNearBy = useStoreNearBy(location.latitude, location.longitude, 10, "all");
    console.log(storesNearBy);
    const stores = useStoreByProvinceId(provinceId);
    const [showNearBy, setShowNearBy] = useState(null);
    return (
        <Container maxW={"1400px"}>
            <Flex width={"100%"} justifyContent={"flex-end"}>
                <Flex gap={4}>
                    <Select
                        width={"200px"}
                        onChange={(e) => {
                            setProvinceId(e.target.value);
                            setShowNearBy(false);
                        }}
                    >
                        {provinces.map((province, index) => (
                            <option key={index} value={province.id}>
                                {province.name}
                            </option>
                        ))}
                    </Select>
                    <IconButton
                        onClick={() => setShowNearBy(!showNearBy)}
                        borderRadius={"full"}
                        colorScheme={"blue"}
                        icon={<FontAwesomeIcon icon={faLocationDot} />}
                    />
                </Flex>
            </Flex>
            <Grid templateColumns={["repeat(4, 1fr)"]} gap={4}>
                {showNearBy &&
                    storesNearBy.map((store) => {
                        <GridItem key={store._id} colSpan={1}>
                            <StoreCard {...store} />
                        </GridItem>;
                    })}
                {!showNearBy &&
                    stores?.map((store) => (
                        <GridItem key={store._id} colSpan={1}>
                            <StoreCard {...store} />
                        </GridItem>
                    ))}
            </Grid>
        </Container>
    );
}

export default FindStorePage;
