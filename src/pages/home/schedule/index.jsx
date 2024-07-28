import LocationTab from "@/components/home/schedule/LocationTab";
import ProvinceTab from "@/components/home/schedule/ProvinceTab";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
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
    Textarea,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { faPlus, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import provinces from "@/assets/images/city";
import { useQuery } from "@tanstack/react-query";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useForm } from "react-hook-form";
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
const generateScheduleProvinces = async (code, numDays) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_SCHEDULES_URL}/get-by-province/${code}/${numDays}`,
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { setLoading } = useContext(LoadingContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [numDays, setNumDays] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [provinceCode, setProvinceCode] = useState(null);
    const [locationId, setLocationId] = useState(null);
    const [isAddSchedule, setIsAddSchedule] = useState(false);
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
        onClose();
        if (tabIndex == 0) {
            const data = await generateScheduleProvinces(provinceCode, numDays);
            setScheduleProvinceData(data);
        } else {
            const data = await generateScheduleLocation(locationId);
            setScheduleLocationData(data);
        }
        setLoading(false);
    };
    const onSubmit = (data) => {
        console.log(data); // You can handle your form submission here
    };

    if (!location) {
        return <div>Loading...</div>;
    }
    return (
        <div className="px-12 py-4 w-full min-h-screen">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isAddSchedule ? "Add schedule" : "Tạo lịch trình"}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            {isAddSchedule ? (
                                <VStack spacing={4}>
                                    <FormControl isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <Input {...register("title", { required: true })} />
                                        {errors.title && <p>Title is required.</p>}
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea {...register("description", { required: true })} />
                                        {errors.description && <p>Description is required.</p>}
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Type</FormLabel>
                                        <Select {...register("type", { required: true })}>
                                            <option value="province">Tỉnh</option>
                                            <option value="location">Địa điểm du lịch</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Location</FormLabel>
                                        <Input {...register("location", { required: true })} />
                                        {errors.location && <p>Location is required.</p>}
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Province</FormLabel>
                                        <Input {...register("province", { required: true })} />
                                        {errors.province && <p>Province is required.</p>}
                                    </FormControl>
                                </VStack>
                            ) : (
                                <>
                                    <FormControl>
                                        <FormLabel>Tỉnh</FormLabel>
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
                                    {tabIndex === 0 && (
                                        <FormControl marginTop={"10px"}>
                                            <FormLabel>Số ngày trải nghiệm</FormLabel>
                                            <Input type="number" onChange={(e) => setNumDays(e.target.value)} />
                                        </FormControl>
                                    )}
                                    {tabIndex === 1 && (
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
                                </>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button variant={"ghost"} mr={3} onClick={onClose}>
                                Đóng
                            </Button>
                            {isAddSchedule ? (
                                <Button colorScheme="blue" type="submit">
                                    Gửi
                                </Button>
                            ) : (
                                <Button colorScheme="blue" onClick={handleClick}>
                                    Gửi
                                </Button>
                            )}
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <Text marginBottom={"16px"} fontSize={"2xl"} fontWeight={"bold"} className="text-primary-100">
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
                                onClick={() => {
                                    onOpen();
                                    setIsAddSchedule(false);
                                }}
                                className="flex items-center gap-2 bg-primary-200 text-white px-4 py-3 rounded-xl"
                            >
                                <FontAwesomeIcon icon={faRobot} />
                                <p>Generate</p>
                            </button>
                            <button
                                onClick={() => {
                                    onOpen();
                                    setIsAddSchedule(true);
                                }}
                                className="flex items-center gap-2 bg-primary-500 text-primary-100 px-4 py-3 rounded-xl"
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
