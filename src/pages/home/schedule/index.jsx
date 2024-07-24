import LocationTab from "@/components/home/schedule/LocationTab";
import ProvinceTab from "@/components/home/schedule/ProvinceTab";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { faPlus, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import provinces from "@/assets/images/city";
import { useQuery } from "@tanstack/react-query";
import { LoadingContext } from "@/contexts/LoadingContext";
async function fetchLocations(provinceCode) {
    if (!provinceCode) {
        return []; // Return an empty array or any other default value as needed
    }
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_PROVINCES_URL}/${provinceCode}${import.meta.env.VITE_PROVINCES_EXPERIENCE_LOCATIONS}`;
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data; // Make sure this is not undefined
    } catch (error) {
        console.error("Error fetching locations:", error);
        return []; // Return an empty array or any other default value in case of error
    }
}
const generateScheduleProvinces = async (code) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_SCHEDULES_URL}/get-by-province/${code}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }
        const responseData = await res.json();
        return responseData["itinerary"];
    } catch (error) {
        console.error("Fetching data failed:", error);
    }
};
async function generateScheduleLocation(locationId) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_SCHEDULES_URL}/get-by-experience-location/${locationId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }
        const responseData = await res.json();
        return responseData["itinerary"];
    } catch (error) {
        console.error("Fetching data failed:", error);
    }
}
function SchedulePage() {
    const { setLoading } = useContext(LoadingContext);
    const [tabIndex, setTabIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [provinceCode, setProvinceCode] = useState(null);
    const [locationId, setLocationId] = useState(null);
    const { data: locations } = useQuery({
        queryKey: ["locations", provinceCode],
        queryFn: () => fetchLocations(provinceCode),
        initialData: () => {
            return []; // Or any other default value
        },
    });
    const [scheduleProvinceData, setScheduleProvinceData] = useState(null);
    const [scheduleLocationData, setScheduleLocationData] = useState(null);
    const handleClick = async () => {
        setLoading(true);
        if (tabIndex == 0) {
            const data = await generateScheduleProvinces(provinceCode);
            setScheduleProvinceData(data);
        } else {
            const data = await generateScheduleLocation(locationId);
            setScheduleLocationData(data);
        }
        onClose();
        setLoading(false);
    };
    if (!location) {
        return <div>Loading...</div>;
    }
    return (
        <div className="px-12 py-4 w-full min-h-screen">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Generate Schedule</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Province</FormLabel>
                            <Select
                                placeholder="Select province"
                                variant="flushed"
                                onChange={(e) => setProvinceCode(e.target.value)}
                            >
                                {provinces.map((item, index) => (
                                    <option value={item.code} key={index}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        {tabIndex == 1 && (
                            <FormControl marginTop={"10px"}>
                                <FormLabel>Location</FormLabel>
                                <Select
                                    placeholder="Select location"
                                    variant="flushed"
                                    onChange={(e) => setLocationId(e.target.value)}
                                >
                                    {locations.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.locationName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant={"ghost"} mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" onClick={handleClick}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Text marginBottom={"16px"} fontSize={"2xl"} fontWeight={"bold"}>
                Schedule
            </Text>
            <Tabs position="relative" variant="unstyled">
                <TabList>
                    <Flex width={"full"} justifyContent={"space-between"}>
                        <Flex>
                            <Tab onClick={() => setTabIndex(0)}>Province</Tab>
                            <Tab onClick={() => setTabIndex(1)}>Location</Tab>
                        </Flex>
                        <Flex gap={5}>
                            <button
                                onClick={onOpen}
                                className="flex items-center gap-2 bg-primary-200 text-white px-4 py-3 rounded-xl"
                            >
                                <FontAwesomeIcon icon={faRobot} />
                                <p>Generate</p>
                            </button>
                            <button
                                onClick={onOpen}
                                className="flex items-center gap-2 bg-secondary text-primary-200 px-4 py-3 rounded-xl"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <p>New Schedule</p>
                            </button>
                        </Flex>
                    </Flex>
                </TabList>
                <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
                <TabPanels>
                    <TabPanel paddingX={0}>
                        <ProvinceTab data={scheduleProvinceData} />
                    </TabPanel>
                    <TabPanel paddingX={0}>
                        <LocationTab data={scheduleLocationData} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}

export default SchedulePage;
