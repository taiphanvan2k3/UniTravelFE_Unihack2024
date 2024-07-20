import { DefaultAvatar01 } from "@/assets/images";
import { food, food_1, food_2, food_3 } from "@/assets/images";
const stores = [
    {
        name: "Cơm tấm sườn nướng",
        thumbnailUrl: food,
        province: "Hanoi",
        detailAddress: "87 Lò Đúc",
        openingHours: 7,
    },
    {
        name: "Cơm thố bách khoa",
        thumbnailUrl: food_1,
        province: "Hanoi",
        detailAddress: "Hàng Bông",
        openingHours: 8,
    },
    {
        name: "Quán cơm rang 1989",
        thumbnailUrl: food_2,
        province: "Hanoi",
        detailAddress: "Cơm Rang văn Phòng",
        openingHours: 9,
    },
    {
        name: "Bánh mì Cô chun",
        thumbnailUrl: food_3,
        province: "Hanoi",
        detailAddress: "Bánh mì Cô Chun",
        openingHours: 10,
    },
];
const tourGuider = [
    {
        name: "Dang nguyen",
        avatar: DefaultAvatar01,
        rate: 9.6,
    },
    {
        name: "Phan Văn tài",
        avatar: DefaultAvatar01,
        rate: 10,
    },
    {
        name: "Mai Trịnh Xuân Quý",
        avatar: DefaultAvatar01,
        rate: 8,
    },
    {
        name: "Mạnh",
        avatar: DefaultAvatar01,
        rate: 7,
    },
    {
        name: "Mạnh",
        avatar: DefaultAvatar01,
        rate: 7.8,
    },
];
export { tourGuider, stores };
