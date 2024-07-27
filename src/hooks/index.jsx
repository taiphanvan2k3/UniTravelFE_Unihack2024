import { LoadingContext } from "@/contexts/LoadingContext";
import { useContext, useEffect, useState } from "react";

const useStoreByProvinceId = (provinceId, businessType = "all") => {
    const [storesNearBy, setStoresNearBy] = useState([]);
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
    const storesUrl = import.meta.env.VITE_STORES_URL;
    const url = `${baseUrl}${storesUrl}/${provinceId}/available-stores?businessType=${businessType}`;
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            setStoresNearBy(data);
            return data;
        };
        if (provinceId !== null) fetchData();
    }, [provinceId, businessType, url]);
    return storesNearBy;
};
const useStoreNearBy = (latitude, longitude, radius, businessType) => {
    const [stores, setStores] = useState([]);
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
    const storesUrl = import.meta.env.VITE_STORES_URL;
    const url = `${baseUrl}${storesUrl}/nearby-stores?longitude=${longitude}&latitude=${latitude}&radius=${radius}&businessType=${businessType}`;
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            setStores(data);
        };
        if (latitude && longitude) {
            fetchData();
        }
    }, [latitude, longitude, radius, businessType, url]);
    return stores;
};
const useNewFeeds = () => {
    const [newFeeds, setNewFeeds] = useState([]);
    useEffect(() => {
        const fetchNewFeeds = async () => {
            const pageIndex = 1;
            const pageSize = 20;
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_POSTS_URL}/new-feeds?pageIndex=${pageIndex}&pageSize=${pageSize}`;
            const res = await fetch(url);
            const data = await res.json();
            setNewFeeds(data);
        };
        fetchNewFeeds();
    }, []);
    return { newFeeds };
};
export { useStoreByProvinceId, useStoreNearBy, useNewFeeds };
