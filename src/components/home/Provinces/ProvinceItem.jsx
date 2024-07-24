import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { vietnam } from "@/assets/images";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function ProvinceItem({ code, title, thumbnailUrl }) {
    return (
        <Link to={`/provinces/${code}`}>
            <Stack
                justifyContent={"space-between"}
                height={"100%"}
                width={"100%"}
                boxShadow={"lg"}
                className="hover:scale-105 duration-300 ease-in-out group"
                borderRadius={"lg"}
                padding={"20px"}
                cursor={"pointer"}
            >
                <Image src={thumbnailUrl} width={"100%"} height={"90%"} borderRadius={"lg"} />
                <Flex>
                    <Text
                        fontWeight={"semibold"}
                        className="text-lg  text-black group-hover:text-primary-100 duration-300"
                        marginTop={"3px"}
                    >
                        {title}
                    </Text>
                </Flex>
            </Stack>
        </Link>
    );
}

export default ProvinceItem;
