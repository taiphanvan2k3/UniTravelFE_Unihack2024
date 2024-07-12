import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import { ROUTE_CONSTANTS } from "@/constants/routes";
import { AuthContext } from "@/contexts/AuthContext";
import { Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminLayout() {
    console.log("AdminLayout re-render");
    const { auth } = useContext(AuthContext);
    if (!auth.isAuthenticated) {
        localStorage.setItem("redirect", "/admin");
        return <Navigate to={ROUTE_CONSTANTS.SIGN_IN_PAGE} />;
    }

    return (
        <Grid h="100vh" templateRows="repeat(30, 1fr)" templateColumns="repeat(30, 1fr)" gap={6}>
            <GridItem rowSpan={30} colSpan={4} boxShadow={"xl"} borderRadius={"lg"} padding={"30px"} bg={"blue.400"}>
                <SideBar />
            </GridItem>
            <GridItem rowSpan={4} colSpan={26} boxShadow={"xl"} borderRadius={"lg"} padding={"20px"}>
                <Header />
            </GridItem>
            <GridItem rowSpan={25} colSpan={25}>
                <Outlet />
            </GridItem>
        </Grid>
    );
}

export default AdminLayout;
