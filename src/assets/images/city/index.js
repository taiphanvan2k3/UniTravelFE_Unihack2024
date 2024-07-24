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
import vinh_phuc from "./vinh_phuc.jpg";
import ninh_binh from "./ninh_binh.jpg";
import quang_ngai from "./quang_ngai.jpg";
import tien_giang from "./tien_giang.jpg";
import tra_vinh from "./tra_vinh.jpg";
import lao_cai from "./lao_cai.jpg";
import lai_chau from "./lai_chau.jpg";
import phu_tho from "./phu_tho.jpg";
import nghe_an from "./nghe_an.jpg";
import tay_ninh from "./tay_ninh.jpg";
import vinh_long from "./vinh_long.jpg";
import bac_kan from "./bac_kan.jpg";
import son_la from "./son_la.jpg";
import thai_nguyen from "./thai_nguyen.jpg";
import thai_binh from "./thai_binh.jpg";
import thanh_hoa from "./thanh_hoa.jpg";
import quang_binh from "./quang_binh.jpg";
import thua_thien_hue from "./thua_thien_hue.jpg";
import quang_nam from "./quang_nam.jpg";
import phu_yen from "./phu_yen.jpg";
import khanh_hoa from "./khanh_hoa.jpg";
import ninh_thuan from "./ninh_thuan.jpg";
import long_an from "./long_an.jpg";
import kien_giang from "./kien_giang.jpg";
import tuyen_quang from "./tuyen_quang.jpg";
import yen_bai from "./yen_bai.jpg";
import lang_son from "./lang_son.jpg";
import quang_ninh from "./quang_ninh.jpg";
import hung_yen from "./hung_yen.jpg";
import nam_dinh from "./nam_dinh.jpg";
import quang_tri from "./quang_tri.jpg";
import kon_tum from "./kon_tum.jpg";
import lam_dong from "./lam_dong.jpg";
import soc_trang from "./soc_trang.jpg";

const provinces = [
    { code: "01", name: "Hà Nội", thumbnailUrl: ha_noi, id: "6682d2a0a1514ba848db2a54" },
    { code: "17", name: "Hoà Bình", thumbnailUrl: hoa_binh, id: "6682d2a0a1514ba848db2a5e" },
    { code: "26", name: "Vĩnh Phúc", thumbnailUrl: vinh_phuc, id: "6682d2a0a1514ba848db2a64" },
    { code: "27", name: "Bắc Ninh", thumbnailUrl: bac_ninh, id: "6682d2a0a1514ba848db2a65" },
    { code: "31", name: "Hải Phòng", thumbnailUrl: hai_phong, id: "6682d2a0a1514ba848db2a67" },
    { code: "37", name: "Ninh Bình", thumbnailUrl: ninh_binh, id: "6682d2a0a1514ba848db2a6c" },
    { code: "51", name: "Quảng Ngãi", thumbnailUrl: quang_ngai, id: "6682d2a0a1514ba848db2a75" },
    { code: "60", name: "Bình Thuận", thumbnailUrl: binh_thuan, id: "6682d2a0a1514ba848db2a7a" },
    { code: "67", name: "Đắk Nông", thumbnailUrl: dak_nong, id: "6682d2a0a1514ba848db2a7e" },
    { code: "82", name: "Tiền Giang", thumbnailUrl: tien_giang, id: "6682d2a0a1514ba848db2a87" },
    { code: "84", name: "Trà Vinh", thumbnailUrl: tra_vinh, id: "6682d2a0a1514ba848db2a89" },
    { code: "95", name: "Bạc Liêu", thumbnailUrl: bac_lieu, id: "6682d2a0a1514ba848db2a91" },
    { code: "04", name: "Cao Bằng", thumbnailUrl: cao_bang, id: "6682d2a0a1514ba848db2a56" },
    { code: "10", name: "Lào Cai", thumbnailUrl: lao_cai, id: "6682d2a0a1514ba848db2a59" },
    { code: "12", name: "Lai Châu", thumbnailUrl: lai_chau, id: "6682d2a0a1514ba848db2a5b" },
    { code: "25", name: "Phú Thọ", thumbnailUrl: phu_tho, id: "6682d2a0a1514ba848db2a63" },
    { code: "40", name: "Nghệ An", thumbnailUrl: nghe_an, id: "6682d2a0a1514ba848db2a6e" },
    { code: "42", name: "Hà Tĩnh", thumbnailUrl: ha_tinh, id: "6682d2a0a1514ba848db2a6f" },
    { code: "64", name: "Gia Lai", thumbnailUrl: gia_lai, id: "6682d2a0a1514ba848db2a7c" },
    { code: "72", name: "Tây Ninh", thumbnailUrl: tay_ninh, id: "6682d2a0a1514ba848db2a81" },
    { code: "74", name: "Bình Dương", thumbnailUrl: binh_duong, id: "6682d2a0a1514ba848db2a82" },
    { code: "75", name: "Đồng Nai", thumbnailUrl: dong_nai, id: "6682d2a0a1514ba848db2a83" },
    { code: "77", name: "Bà Rịa - Vũng Tàu", thumbnailUrl: ba_ria_vung_tau, id: "6682d2a0a1514ba848db2a84" },
    { code: "83", name: "Bến Tre", thumbnailUrl: ben_tre, id: "6682d2a0a1514ba848db2a88" },
    { code: "86", name: "Vĩnh Long", thumbnailUrl: vinh_long, id: "6682d2a0a1514ba848db2a8a" },
    { code: "96", name: "Cà Mau", thumbnailUrl: ca_mau, id: "6682d2a0a1514ba848db2a92" },
    { code: "06", name: "Bắc Kạn", thumbnailUrl: bac_kan, id: "6682d2a0a1514ba848db2a57" },
    { code: "11", name: "Điện Biên", thumbnailUrl: dien_bien, id: "6682d2a0a1514ba848db2a5a" },
    { code: "14", name: "Sơn La", thumbnailUrl: son_la, id: "6682d2a0a1514ba848db2a5c" },
    { code: "19", name: "Thái Nguyên", thumbnailUrl: thai_nguyen, id: "6682d2a0a1514ba848db2a5f" },
    { code: "30", name: "Hải Dương", thumbnailUrl: hai_duong, id: "6682d2a0a1514ba848db2a66" },
    { code: "34", name: "Thái Bình", thumbnailUrl: thai_binh, id: "6682d2a0a1514ba848db2a69" },
    { code: "35", name: "Hà Nam", thumbnailUrl: ha_nam, id: "6682d2a0a1514ba848db2a6a" },
    { code: "38", name: "Thanh Hoá", thumbnailUrl: thanh_hoa, id: "6682d2a0a1514ba848db2a6d" },
    { code: "44", name: "Quảng Bình", thumbnailUrl: quang_binh, id: "6682d2a0a1514ba848db2a70" },
    { code: "46", name: "Thừa Thiên Huế", thumbnailUrl: thua_thien_hue, id: "6682d2a0a1514ba848db2a72" },
    { code: "49", name: "Quảng Nam", thumbnailUrl: quang_nam, id: "6682d2a0a1514ba848db2a74" },
    { code: "54", name: "Phú Yên", thumbnailUrl: phu_yen, id: "6682d2a0a1514ba848db2a77" },
    { code: "56", name: "Khánh Hòa", thumbnailUrl: khanh_hoa, id: "6682d2a0a1514ba848db2a78" },
    { code: "58", name: "Ninh Thuận", thumbnailUrl: ninh_thuan, id: "6682d2a0a1514ba848db2a79" },
    { code: "66", name: "Đắk Lắk", thumbnailUrl: dak_lak, id: "6682d2a0a1514ba848db2a7d" },
    { code: "70", name: "Bình Phước", thumbnailUrl: binh_phuoc, id: "6682d2a0a1514ba848db2a80" },
    { code: "79", name: "Hồ Chí Minh", thumbnailUrl: ho_chi_minh, id: "6682d2a0a1514ba848db2a85" },
    { code: "80", name: "Long An", thumbnailUrl: long_an, id: "6682d2a0a1514ba848db2a86" },
    { code: "91", name: "Kiên Giang", thumbnailUrl: kien_giang, id: "6682d2a0a1514ba848db2a8d" },
    { code: "92", name: "Cần Thơ", thumbnailUrl: can_tho, id: "6682d2a0a1514ba848db2a8e" },
    { code: "93", name: "Hậu Giang", thumbnailUrl: hau_giang, id: "6682d2a0a1514ba848db2a8f" },
    { code: "02", name: "Hà Giang", thumbnailUrl: ha_giang, id: "6682d2a0a1514ba848db2a55" },
    { code: "08", name: "Tuyên Quang", thumbnailUrl: tuyen_quang, id: "6682d2a0a1514ba848db2a58" },
    { code: "15", name: "Yên Bái", thumbnailUrl: yen_bai, id: "6682d2a0a1514ba848db2a5d" },
    { code: "20", name: "Lạng Sơn", thumbnailUrl: lang_son, id: "6682d2a0a1514ba848db2a60" },
    { code: "22", name: "Quảng Ninh", thumbnailUrl: quang_ninh, id: "6682d2a0a1514ba848db2a61" },
    { code: "24", name: "Bắc Giang", thumbnailUrl: bac_giang, id: "6682d2a0a1514ba848db2a62" },
    { code: "33", name: "Hưng Yên", thumbnailUrl: hung_yen, id: "6682d2a0a1514ba848db2a68" },
    { code: "36", name: "Nam Định", thumbnailUrl: nam_dinh, id: "6682d2a0a1514ba848db2a6b" },
    { code: "45", name: "Quảng Trị", thumbnailUrl: quang_tri, id: "6682d2a0a1514ba848db2a71" },
    { code: "48", name: "Đà Nẵng", thumbnailUrl: da_nang, id: "6682d2a0a1514ba848db2a73" },
    { code: "52", name: "Bình Định", thumbnailUrl: binh_dinh, id: "6682d2a0a1514ba848db2a76" },
    { code: "62", name: "Kon Tum", thumbnailUrl: kon_tum, id: "6682d2a0a1514ba848db2a7b" },
    { code: "68", name: "Lâm Đồng", thumbnailUrl: lam_dong, id: "6682d2a0a1514ba848db2a7f" },
    { code: "87", name: "Đồng Tháp", thumbnailUrl: dong_thap, id: "6682d2a0a1514ba848db2a8b" },
    { code: "89", name: "An Giang", thumbnailUrl: an_giang, id: "6682d2a0a1514ba848db2a8c" },
    { code: "94", name: "Sóc Trăng", thumbnailUrl: soc_trang, id: "6682d2a0a1514ba848db2a90" },
];

export default provinces;
