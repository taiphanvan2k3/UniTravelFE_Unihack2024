import { Container, Grid } from "@chakra-ui/react";
import ScheduleItem from "./ScheduleItem";
import PropTypes from "prop-types";

function LocationTab({ data }) {
    if (!data) return null;
    return (
        <Container maxW={"container.2xl"} p={4}>
            <Grid templateColumns="repeat(3, 1fr)" gap={10} padding={"30px"}>
                {data &&
                    data.schedule.map((item, index) => (
                        <ScheduleItem key={index} timeOnDate={item.time} activities={item.activities} />
                    ))}
            </Grid>
        </Container>
    );
}
LocationTab.propTypes = {
    data: PropTypes.object,
};
export default LocationTab;
