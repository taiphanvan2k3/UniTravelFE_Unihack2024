import Loading from "@/components/common/Loading";
import PostCard from "@/components/social/PostCard";
import { useFeeds } from "@/contexts/FeedContext";
import { useNewFeeds } from "@/hooks";
import { Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function SocialPage() {
    const [isLoading, setLoading] = useState(false);
    const { newFeeds } = useNewFeeds();
    const { feeds, setFeeds } = useFeeds();
    useEffect(() => {
        if (newFeeds) setFeeds(newFeeds);
    }, [setFeeds, newFeeds]);
    return (
        <Container maxWidth={"100%"} paddingY={"40px"} marginTop={"47px"}>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
                New Feeds
            </Text>
            {isLoading ? <Loading /> : feeds.map((item) => <PostCard key={item.id} {...item} />)}
        </Container>
    );
}

export default SocialPage;
