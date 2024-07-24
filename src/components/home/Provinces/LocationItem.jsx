import { Grid } from "@chakra-ui/react";
import PropTypes from "prop-types"; // Ensure PropTypes is imported

function LocationItem({ item }) {
    return (
        <Grid
            templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={4}
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            padding={"10px"}
        >
            {item}
        </Grid>
    );
}

// Fix: Change 'Location' to 'LocationItem' to match the component name
LocationItem.propTypes = {
    item: PropTypes.string.isRequired,
};

export default LocationItem;
