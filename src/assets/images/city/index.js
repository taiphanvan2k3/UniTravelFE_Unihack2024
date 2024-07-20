import an_giang from "./an_giang.jpg";
import ba_ria_vung_tau from "./ba_ria_vung_tau.jpg";
import bac_giang from "./bac_giang.jpg";
import bac_lieu from "./bac_lieu.jpg";
import bac_ninh from "./bac_ninh.jpg";
import ben_tre from "./ben_tre.jpg";
import binh_dinh from "./binh_dinh.jpg";
import binh_duong from "./binh_duong.jpg";
import binh_phuoc from "./binh_phuoc.jpg";
import binh_thuan from "./binh_thuan.jpg";
import ca_mau from "./ca_mau.jpg";
import can_tho from "./can_tho.jpg";
import cao_bang from "./cao_bang.jpg";
import da_nang from "./da_nang.jpg";
import dak_lak from "./dak_lak.jpg";
import dak_nong from "./dak_nong.jpg";
import dien_bien from "./dien_bien.jpg";
import dong_nai from "./dong_nai.jpg";
import dong_thap from "./dong_thap.jpg";
import gia_lai from "./gia_lai.jpg";
import ha_giang from "./ha_giang.jpg";
import ha_nam from "./ha_nam.jpg";
import ha_noi from "./ha_noi.jpg";
import ha_tinh from "./ha_tinh.jpg";
import hai_duong from "./hai_duong.jpg";
import hai_phong from "./hai_phong.jpg";
import hau_giang from "./hau_giang.jpg";
import hoa_binh from "./hoa_binh.jpg";
import ho_chi_minh from "./ho_chi_minh.jpg";

export {
    an_giang,
    ba_ria_vung_tau,
    bac_giang,
    bac_lieu,
    bac_ninh,
    ben_tre,
    binh_dinh,
    binh_duong,
    binh_phuoc,
    binh_thuan,
    ca_mau,
    can_tho,
    cao_bang,
    da_nang,
    dak_lak,
    dak_nong,
    dien_bien,
    dong_nai,
    dong_thap,
    gia_lai,
    ha_giang,
    ha_nam,
    ha_noi,
    ha_tinh,
    hai_duong,
    hai_phong,
    hau_giang,
    hoa_binh,
    ho_chi_minh,
};

const data = [
    { code: "01", name: "Hà Nội", thumbnailUrl: ha_noi },
    { code: "17", name: "Hoà Bình", thumbnailUrl: hoa_binh },
    // { code: "26", name: "Vĩnh Phúc", thumbnailUrl: vin_phuc },
    { code: "27", name: "Bắc Ninh", thumbnailUrl: bac_ninh },
    { code: "31", name: "Hải Phòng", thumbnailUrl: hai_phong },
    // { code: "37", name: "Ninh Bình", thumbnailUrl: ninh_binh },
    // { code: "51", name: "Quảng Ngãi", thumbnailUrl: quang_ngai },
    { code: "60", name: "Bình Thuận", thumbnailUrl: binh_thuan },
    { code: "67", name: "Đắk Nông", thumbnailUrl: dak_nong },
    // { code: "82", name: "Tiền Giang", thumbnailUrl: tien_giang },
    // { code: "84", name: "Trà Vinh", thumbnailUrl: tra_vinh },
    { code: "95", name: "Bạc Liêu", thumbnailUrl: bac_lieu },
    { code: "04", name: "Cao Bằng", thumbnailUrl: cao_bang },
    // { code: "10", name: "Lào Cai", thumbnailUrl: lao_cai },
    // { code: "12", name: "Lai Châu", thumbnailUrl: lai_chau },
    // { code: "25", name: "Phú Thọ", thumbnailUrl: phu_tho },
    // { code: "40", name: "Nghệ An", thumbnailUrl: nghe_an },
    { code: "42", name: "Hà Tĩnh", thumbnailUrl: ha_tinh },
    { code: "64", name: "Gia Lai", thumbnailUrl: gia_lai },
    // { code: "72", name: "Tây Ninh", thumbnailUrl: tay_ninh },
    { code: "74", name: "Bình Dương", thumbnailUrl: binh_duong },
    { code: "75", name: "Đồng Nai", thumbnailUrl: dong_nai },
    { code: "77", name: "Bà Rịa - Vũng Tàu", thumbnailUrl: ba_ria_vung_tau },
    { code: "83", name: "Bến Tre", thumbnailUrl: ben_tre },
    // { code: "86", name: "Vĩnh Long", thumbnailUrl: vin_long },
    { code: "96", name: "Cà Mau", thumbnailUrl: ca_mau },
    // { code: "06", name: "Bắc Kạn", thumbnailUrl: bac_kan },
    { code: "11", name: "Điện Biên", thumbnailUrl: dien_bien },
    // { code: "14", name: "Sơn La", thumbnailUrl: son_la },
    // { code: "19", name: "Thái Nguyên", thumbnailUrl: thai_nguyen },
    { code: "30", name: "Hải Dương", thumbnailUrl: hai_duong },
    // { code: "34", name: "Thái Bình", thumbnailUrl: thai_binh },
    { code: "35", name: "Hà Nam", thumbnailUrl: ha_nam },
    // { code: "38", name: "Thanh Hoá", thumbnailUrl: thanh_hoa },
    // { code: "44", name: "Quảng Bình", thumbnailUrl: quang_binh },
    // { code: "46", name: "Thừa Thiên Huế", thumbnailUrl: thua_thien_hue },
    // { code: "49", name: "Quảng Nam", thumbnailUrl: quang_nam },
    // { code: "54", name: "Phú Yên", thumbnailUrl: phu_yen },
    // { code: "56", name: "Khánh Hòa", thumbnailUrl: khanh_hoa },
    // { code: "58", name: "Ninh Thuận", thumbnailUrl: ninh_thuan },
    { code: "66", name: "Đắk Lắk", thumbnailUrl: dak_lak },
    { code: "70", name: "Bình Phước", thumbnailUrl: binh_phuoc },
    { code: "79", name: "Hồ Chí Minh", thumbnailUrl: ho_chi_minh },
    // { code: "80", name: "Long An", thumbnailUrl: long_an },
    // { code: "91", name: "Kiên Giang", thumbnailUrl: kien_giang },
    { code: "92", name: "Cần Thơ", thumbnailUrl: can_tho },
    { code: "93", name: "Hậu Giang", thumbnailUrl: hau_giang },
    { code: "02", name: "Hà Giang", thumbnailUrl: ha_giang },
    // { code: "08", name: "Tuyên Quang", thumbnailUrl: tuyen_quang },
    // { code: "15", name: "Yên Bái", thumbnailUrl: yen_bai },
    // { code: "20", name: "Lạng Sơn", thumbnailUrl: lang_son },
    // { code: "22", name: "Quảng Ninh", thumbnailUrl: quang_ninh },
    { code: "24", name: "Bắc Giang", thumbnailUrl: bac_giang },
    // { code: "33", name: "Hưng Yên", thumbnailUrl: hung_yen },
    // { code: "36", name: "Nam Định", thumbnailUrl: nam_dinh },
    // { code: "45", name: "Quảng Trị", thumbnailUrl: quang_tri },
    { code: "48", name: "Đà Nẵng", thumbnailUrl: da_nang },
    { code: "52", name: "Bình Định", thumbnailUrl: binh_dinh },
    // { code: "62", name: "Kon Tum", thumbnailUrl: kon_tum },
    // { code: "68", name: "Lâm Đồng", thumbnailUrl: lam_dong },
    { code: "87", name: "Đồng Tháp", thumbnailUrl: dong_thap },
    { code: "89", name: "An Giang", thumbnailUrl: an_giang },
    // { code: "94", name: "Sóc Trăng", thumbnailUrl: soc_trang },
];

export default data;
