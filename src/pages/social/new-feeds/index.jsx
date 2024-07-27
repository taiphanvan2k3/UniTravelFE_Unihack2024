import { Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postFuncPath as path } from "@/utils";
import Post from "@/components/common/Post";
function NewFeedsPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const url = path.getNewFeeds();
            const res = await fetch(url);
            const data = await res.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);
    console.log(posts);
    return (
        <Container maxWidth={"container.2xl"}>
            <Heading size={"lg"} marginTop={10}>
                New feeds
            </Heading>
            {posts.map((post) => (
                <Post key={post._id} {...post} />
            ))}
        </Container>
    );
}

export default NewFeedsPage;
