import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import {
    faBook,
    faCircleExclamation,
    faFeed,
    faLayerGroup,
    faNetworkWired,
    faRss,
    faStar,
    faUserGroup,
    faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
const pages = [
    { name: "New feed", link: "/unitravel/new-feeds", icon: faFeed },
    {
        name: "Popular",
        link: "/unitravel/popular",
        icon: faStar,
    },
    {
        name: "Explore",
        link: "/unitravel/explore",
        icon: faUserGroup,
    },
];
const pages_2 = [
    { name: "Forums", link: "/unitravel/forums", icon: faLayerGroup },
    { name: "Best of Unitravel", link: "/unitravel/best-of-unitravel", icon: faUsersBetweenLines },
    { name: "Topic", link: "/unitravel/topic", icon: faNetworkWired },
];
const pages_3 = [
    { name: "Content Policy", link: "/unitravel/content-policy", icon: faBook },
    { name: "Privacy Policy", link: "/unitravel/privacy-policy", icon: faCircleExclamation },
];
function LeftSideBar() {
    return (
        <VStack height={"100%"} position={"fixed"} width={"230px"} top={"140px"}>
            {pages.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.link}
                    className={"rounded-2xl"}
                    style={({ isActive }) => ({
                        width: "250px",
                        padding: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        borderRadius: "xl",
                        backgroundColor: isActive ? "#04305f" : "transparent", // Background color changes based on isActive
                        color: isActive ? "white" : "inherit", // Text color changes based on isActive
                        textDecoration: "none",
                    })}
                >
                    <Flex width={"100%"} gap={4} alignItems={"center"} padding={3}>
                        <FontAwesomeIcon icon={item.icon} />
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            {item.name}
                        </Text>
                    </Flex>
                </NavLink>
            ))}
            <Box height={0.5} width={"100%"} backgroundColor={"gray.300"}></Box>
            {pages_2.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.link}
                    className={"rounded-2xl"}
                    style={({ isActive }) => ({
                        width: "250px",
                        padding: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        borderRadius: "xl",
                        backgroundColor: isActive ? "#04305f" : "transparent", // Background color changes based on isActive
                        color: isActive ? "white" : "inherit", // Text color changes based on isActive
                        textDecoration: "none",
                    })}
                >
                    <Flex width={"100%"} gap={4} alignItems={"center"} padding={3}>
                        <FontAwesomeIcon icon={item.icon} />
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            {item.name}
                        </Text>
                    </Flex>
                </NavLink>
            ))}
            <Box height={0.5} width={"100%"} backgroundColor={"gray.300"}></Box>
            {pages_3.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.link}
                    className={"rounded-2xl"}
                    style={({ isActive }) => ({
                        width: "250px",
                        padding: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        borderRadius: "xl",
                        backgroundColor: isActive ? "#04305f" : "transparent", // Background color changes based on isActive
                        color: isActive ? "white" : "inherit", // Text color changes based on isActive
                        textDecoration: "none",
                    })}
                >
                    <Flex width={"100%"} gap={4} alignItems={"center"} padding={3}>
                        <FontAwesomeIcon icon={item.icon} />
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            {item.name}
                        </Text>
                    </Flex>
                </NavLink>
            ))}
        </VStack>
    );
}

export default LeftSideBar;
