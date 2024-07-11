import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <Grid h="100vh" templateRows="repeat(30, 1fr)" templateColumns="repeat(30, 1fr)" gap={6}>
            <GridItem rowSpan={30} colSpan={4} boxShadow={"xl"} borderRadius={"lg"} padding={"30px"}>
                <SideBar />
            </GridItem>
            <GridItem rowSpan={4} colSpan={26} boxShadow={"xl"} borderRadius={"lg"} padding={"20px"}>
                <Header />
            </GridItem>
            <GridItem rowSpan={25} colSpan={25} boxShadow={"2xl"} borderRadius={"lg"}>
                <Outlet />
            </GridItem>
        </Grid>
    );
}

export default AdminLayout;
