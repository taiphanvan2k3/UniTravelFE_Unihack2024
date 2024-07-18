import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { vietnam } from "@/assets/images";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function ProvinceItem({ code, title }) {
    return (
        <Link to={`/provinces/${code}`}>
            <Stack
                justifyContent={"space-between"}
                height={"100%"}
                width={"100%"}
                boxShadow={"lg"}
                className="hover:scale-105 duration-300 ease-in-out"
                borderRadius={"lg"}
                padding={"20px"}
                cursor={"pointer"}
            >
                <Image src={vietnam} width={"100%"} height={"100%"} borderRadius={"lg"} />
                <Flex>
                    <Text fontWeight={"semibold"} className="text-lg" marginTop={"10px"}>
                        {title}
                    </Text>
                </Flex>
            </Stack>
        </Link>
    );
}

export default ProvinceItem;
