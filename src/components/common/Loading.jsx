import { Box } from "@chakra-ui/react";
import { lineSpinner } from "ldrs";

lineSpinner.register();
function Loading() {
    return (
        <Box className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <l-line-spinner size="200" stroke="3" speed="1" color="black"></l-line-spinner>
        </Box>
    );
}

export default Loading;
