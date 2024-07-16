import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { vietnam } from "@/assets/images";
// eslint-disable-next-line react/prop-types
function ProvinceItem({ title }) {
    return (
        <Stack
            justifyContent={"space-between"}
            height={"100%"}
            width={"100%"}
            boxShadow={"lg"}
            className="hover:scale-105 duration-300 ease-in-out"
            borderRadius={"lg"}
            padding={"20px"}
        >
            <Image src={vietnam} width={"100%"} height={"100%"} borderRadius={"lg"} />
            <Flex>
                <Text fontWeight={"semibold"} className="text-lg" marginTop={"10px"}>
                    {title}
                </Text>
            </Flex>
        </Stack>
    );
}

export default ProvinceItem;
