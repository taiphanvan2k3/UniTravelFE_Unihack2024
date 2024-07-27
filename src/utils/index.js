import provinces from "@/assets/images/city";
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const getProvincesName = (provinceId) => {
    const name = provinces.find((item) => item.id == provinceId).name;
    return name;
};
const getProvinces = () => {
    const sortedData = [...provinces].sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
    return sortedData;
};

export { formatPrice, getProvinces, getProvincesName };
