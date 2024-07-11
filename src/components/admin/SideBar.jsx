import { logo } from "@/assets/images";
import { Box, Flex, Text } from "@chakra-ui/react";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
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
    ];
    return (
        <div className="flex flex-col gap-7">
            <img src={logo} alt={""} className="size-28" />
            {navs.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.link}
                    className={"hover:bg-slate-100 p-3 rounded-xl w-82"}
                    style={({ isActive }) => (isActive ? { fontWeight: "bold", color: "#72ACEE" } : {})}
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
