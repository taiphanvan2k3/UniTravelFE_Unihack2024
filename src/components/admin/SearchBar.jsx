import { Flex, Input } from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar() {
    return (
        <Flex
            height={"100%"}
            width={"350px"}
            gap={4}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"0 10px"}
            bg="#F5F4F4"
            borderRadius={"lg"}
        >
            <FontAwesomeIcon icon={faSearch} />
            <Input placeholder="Search something..." size="md" border={"none"} _focusVisible={{ border: "none" }} />
        </Flex>
    );
}

export default SearchBar;
