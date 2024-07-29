import LeftSideBar from "@/components/social/LeftSidebar";
import RightSidebar from "@/components/social/RightSidebar";
import { Center, Container, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { logo } from "@/assets/images";
import UserDropdown from "@/components/home/UserDropdown";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

function SocialLayout() {
    const { auth } = useContext(AuthContext);

    return (
        <Container paddingX={"2rem"} maxW={"container.2xl"}>
            <Grid height={"100%"} width={"100%"} gap={6} templateColumns={"repeat(6, 1fr)"}>
                <GridItem colSpan={6} rowSpan={1} width={"100%"} position={"fixed"} top={0}>
                    <Grid templateColumns={"repeat(5, 1fr)"}>
                        <GridItem colSpan={1}>
                            <Center>
                                <Link to="/">
                                    <Image height={100} src={logo} marginRight={5} />
                                </Link>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={3}></GridItem>
                        <GridItem colSpan={1}>
                            {
                                <Flex width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                                    <UserDropdown userInfo={auth.user} />
                                </Flex>
                            }
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem>
                    <LeftSideBar />
                </GridItem>
                <GridItem colSpan={4}>
                    <Outlet />
                </GridItem>
                <GridItem colSpan={1}>
                    <RightSidebar />
                </GridItem>{" "}
            </Grid>
        </Container>
    );
}

export default SocialLayout;
