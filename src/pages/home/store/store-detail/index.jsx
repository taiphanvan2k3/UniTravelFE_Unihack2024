import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storeFuncPath as path } from "@/utils";
import { Container, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import Store from "@/components/home/Store/Store";
function StoreDetailPage() {
    const { id } = useParams();
    const [store, setStore] = useState();
    useEffect(() => {
        const fetchStoreDetail = async () => {
            const url = path.getMyStoresById(id);
            const res = await fetch(url);
            const data = await res.json();
            setStore(data);
        };
        fetchStoreDetail();
    }, [id]);
    return (
        <Container maxW={"1300px"} padding={"50px 0"}>
            <Flex alignItems={"center"} gap={4} justifyContent={"start"} marginBottom={5}>
                <Text fontWeight={"bold"} color="gray.300">
                    Cửa hàng
                </Text>
                <FontAwesomeIcon className="size-3 text-gray-300" icon={faGreaterThan} />
                <Text fontWeight={"bold"} color="gray.300">
                    Chi tiết
                </Text>
            </Flex>
            <Store {...store} />
        </Container>
    );
}

export default StoreDetailPage;
