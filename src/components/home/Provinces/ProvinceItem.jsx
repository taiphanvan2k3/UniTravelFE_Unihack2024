import { Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function ProvinceItem({ code, title, thumbnailUrl, description }) {
    return (
        <Link to={`/provinces/${code}`}>
            <Grid
                _hover={{ boxShadow: "2xl", transitionDuration: "0.5s" }}
                boxShadow={"lg"}
                borderRadius={"lg"}
                templateColumns={["repeat(4, 1fr)"]}
                templateRows={["repeat(2, 1fr)"]}
                padding={5}
            >
                <GridItem colSpan={2} rowSpan={2}>
                    <Image height={"100%"} borderRadius={"lg"} src={thumbnailUrl} />
                </GridItem>
                <GridItem colSpan={2} rowSpan={2} paddingX={4}>
                    <VStack alignItems={"start"} justifyContent={"space-evenly"} height={"100%"}>
                        <Text className="text-primary-100 font-roboto" fontWeight={"bold"} fontSize={"xl"}>
                            {title}
                        </Text>
                        <Text fontWeight={"semibold"} color={"gray"}>
                            {description}
                        </Text>
                    </VStack>
                </GridItem>
            </Grid>
        </Link>
    );
}

export default ProvinceItem;
