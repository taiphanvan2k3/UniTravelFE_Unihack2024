import { logo } from "@/assets/images";
import { Box, Flex, Text } from "@chakra-ui/react";
import { faHouse, faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
function SideBar() {
    const navs = [
        {
            name: "Dashboard",
            link: "/admin/dashboard",
            icon: faHouse,
        },
        {
            name: "Users",
            link: "/admin/users",
            icon: faUser,
        },
        {
            name: "Location",
            link: "/admin/location",
            icon: faLocationDot,
        },
    ];
    return (
        <div className="flex flex-col gap-7">
            <img src={logo} alt={""} className="size-28" />
            {navs.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.link}
                    className={"p-3 w-82"}
                    style={({ isActive }) =>
                        isActive ? { fontWeight: "bold", color: "#ffffff" } : { color: "#D3D1D1" }
                    }
                >
                    <Flex justifyContent={"start"} alignItems={"center"} width={"100%"} gap={3}>
                        <Box width={"30px"}>
                            <FontAwesomeIcon icon={item.icon} size="md" />
                        </Box>
                        <Text> {item.name}</Text>
                    </Flex>
                </NavLink>
            ))}
        </div>
    );
}

export default SideBar;
