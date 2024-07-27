import Loading from "@/components/common/Loading";
import PostCard from "@/components/social/PostCard";
import { AuthContext } from "@/contexts/AuthContext";
import { useFeeds } from "@/contexts/FeedContext";
import { Container, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
const fetchNewFeeds = async () => {
    const pageIndex = 1;
    const pageSize = 20;
    const url = `${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_POSTS_URL}/new-feeds?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
function SocialPage() {
    const { feeds, setFeeds, isPending, setIsPending } = useFeeds();
    useEffect(() => {
        setIsPending(true);
        fetchNewFeeds().then((data) => {
            setFeeds(data);
            setIsPending(false);
        });
    }, [setFeeds, setIsPending]);

    return (
        <Container maxWidth={"100%"} paddingY={"40px"} marginTop={"47px"}>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
                New Feeds
            </Text>
            {isPending ? <Loading /> : feeds.map((item) => <PostCard key={item.id} {...item} />)}
        </Container>
    );
}

export default SocialPage;
