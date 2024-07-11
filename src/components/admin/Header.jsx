import { Avatar, Flex } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import { avatar } from "@/assets/images";

function Header() {
    return (
        <Flex maxW={"100%"} alignItems={"center"} flexDirection={"row"} justifyContent={"space-between"}>
            <SearchBar />
            <Flex gap={10}>
                <Flex gap={4} alignItems={"center"}>
                    <div className="bg-gray-100 p-3 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={faMessage} className="size-4" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-full flex justify-center items-center relative">
                        <FontAwesomeIcon icon={faBell} className="size-4" />
                        <span className="absolute top-0 right-0 bg-red-500 text-white size-4 flex items-center justify-center text-xs rounded-full">
                            2
                        </span>
                    </div>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                    <Avatar src={avatar} />
                    <FontAwesomeIcon icon={faArrowDown} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Header;
