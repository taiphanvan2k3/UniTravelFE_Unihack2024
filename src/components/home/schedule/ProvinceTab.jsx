import { Container, Grid, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import ScheduleProvinceItem from "./ScheduleProvinceItem";

function ProvinceTab({ data }) {
    if (!data) return null;
    return (
        <Container maxW={"container.2xl"} p={4}>
            <Text fontWeight={"bold"} fontSize={"2xl"} className="font-roboto text-primary-200" marginBottom={2}>
                {data.title}
            </Text>
            <Text fontSize={"md"} fontWeight={"semibold"} className="text-primary-100">
                {data.description}
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={10} padding={"30px"}>
                {data &&
                    data.schedule.map((item, index) => (
                        <ScheduleProvinceItem key={index} day={item.day} activities={item.activities} />
                    ))}
            </Grid>
        </Container>
    );
}
ProvinceTab.propTypes = {
    data: PropTypes.object,
};
export default ProvinceTab;
