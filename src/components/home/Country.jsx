import { Flex, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { vietnam } from "@/assets/images";
// eslint-disable-next-line react/prop-types
function Country() {
    const { countryId } = useParams();
    //fetch data country and location tourism in that country
    return (
        <Grid h="100vh" templateRows="repeat(2, 1fr)" templateColumns="repeat(10, 1fr)" gap={10} padding={20}>
            <GridItem rowSpan={2} colSpan={3}>
                <Image
                    src={vietnam}
                    className="h-96 rounded-lg object-cover hover:scale-105 duration-300 ease-in-out"
                />
            </GridItem>
            <GridItem colSpan={7} className="hover:scale-105 duration-300 ease-in-out" boxShadow={"lg"} padding={2}>
                <Stack padding={2}>
                    <Flex justifyContent={"space-between"}>
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                            Vietnam
                        </Text>
                        <Text>9.6k</Text>
                    </Flex>
                    <Text>
                        <span className="font-bold">Giới thiệu: </span>
                        Việt Nam, một quốc gia nằm ở phía đông bán đảo Đông Dương, là một đất nước với lịch sử phong phú
                        và nền văn hóa đa dạng. Thủ đô của Việt Nam là Hà Nội, một thành phố cổ kính với nhiều di tích
                        lịch sử và kiến trúc đặc trưng. Việt Nam nổi tiếng với cảnh quan thiên nhiên tuyệt đẹp, từ những
                        bãi biển dài trắng mịn ở Đà Nẵng và Nha Trang, đến những cánh đồng lúa bậc thang xanh mướt ở
                        Sapa và những hang động kỳ vĩ ở Phong Nha-Kẻ Bàng. Văn hóa Việt Nam là sự kết hợp tinh tế giữa
                        các ảnh hưởng Trung Hoa, Ấn Độ và phương Tây, tạo nên một bản sắc độc đáo và phong phú. Các lễ
                        hội truyền thống như Tết Nguyên Đán, Tết Trung Thu và lễ hội Huế thu hút hàng triệu du khách mỗi
                        năm. Ẩm thực Việt Nam cũng là một điểm nhấn với các món ăn đặc trưng như phở, bánh mì, bún chả
                        và nhiều món hải sản tươi ngon. Ngoài ra, Việt Nam còn là một điểm đến hấp dẫn cho các nhà đầu
                        tư và doanh nghiệp quốc tế, với nền kinh tế đang phát triển nhanh chóng và môi trường đầu tư
                        ngày càng được cải thiện. Người dân Việt Nam thân thiện và hiếu khách, luôn sẵn lòng chào đón du
                        khách và bạn bè từ khắp nơi trên thế giới đến khám phá và trải nghiệm vẻ đẹp của đất nước mình.
                    </Text>
                    <Text>
                        <span className="font-bold"> Tỉnh thành </span> : 63
                    </Text>
                </Stack>
            </GridItem>
            <GridItem colSpan={7} bg="papayawhip" />
        </Grid>
    );
}

export default Country;
