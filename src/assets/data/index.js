import { v4 as uuidv4 } from "uuid";
import { provinceImages as provinces } from "../images/city";
import { DefaultAvatar01 } from "../images";

const sampleAvatar = DefaultAvatar01;

const newFeeds = [
    {
        id: uuidv4(),
        user: "Dang Nguyen",
        content:
            "Hi everyone, today I was on the most beautiful mountain in the world. I also want to say hi to Van Tai.",
        images: [provinces.ha_noi, provinces.ha_giang],
        avatar: DefaultAvatar01,
        time: "1h ago",
        votes: 123,
        comments: 40,
        likes: 200,
        sampleComments: [
            {
                id: uuidv4(),
                user: "Van Tai",
                content: "Hi Dang! Looks like you had an amazing time!",
                avatar: sampleAvatar,
                votes: 15,
                comments: 2,
                replies: [
                    {
                        id: uuidv4(),
                        user: "Dang Nguyen",
                        content: "Thanks, Van Tai! It was incredible!",
                        avatar: sampleAvatar,
                        votes: 5,
                        comments: 1,
                        replies: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                user: "Ngoc Lan",
                content: "The scenery is breathtaking. Where exactly is this?",
                avatar: sampleAvatar,
                votes: 20,
                comments: 1,
                replies: [
                    {
                        id: uuidv4(),
                        user: "Dang Nguyen",
                        content: "It's in Ha Giang, highly recommend visiting!",
                        avatar: sampleAvatar,
                        votes: 8,
                        comments: 0,
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        id: uuidv4(),
        user: "Minh Thu",
        content: "Just had the best coffee in town!",
        images: [provinces.ho_chi_minh, provinces.ha_noi],
        time: "2h ago",
        avatar: DefaultAvatar01,
        votes: 85,
        comments: 30,
        likes: 175,
        sampleComments: [
            {
                id: uuidv4(),
                user: "Huy Hoang",
                content: "Where did you get it from?",
                avatar: sampleAvatar,
                votes: 10,
                comments: 1,
                replies: [
                    {
                        id: uuidv4(),
                        user: "Minh Thu",
                        content: "At a little cafe downtown, you should try it!",
                        avatar: sampleAvatar,
                        votes: 3,
                        comments: 0,
                        replies: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                user: "Le An",
                content: "I need to try this place out!",
                avatar: sampleAvatar,
                votes: 5,
                comments: 0,
                replies: [],
            },
        ],
    },
    {
        id: uuidv4(),
        user: "Anh Khoa",
        content: "A wonderful day at the beach!",
        images: [provinces.da_nang],
        avatar: DefaultAvatar01,
        time: "3h ago",
        votes: 75,
        comments: 25,
        likes: 120,
        sampleComments: [
            {
                id: uuidv4(),
                user: "My Linh",
                content: "The beach looks so serene!",
                avatar: sampleAvatar,
                votes: 12,
                comments: 1,
                replies: [],
            },
            {
                id: uuidv4(),
                user: "Bao Lam",
                content: "I wish I was there too.",
                avatar: sampleAvatar,
                votes: 8,
                comments: 0,
                replies: [],
            },
        ],
    },
    // ... more feed entries
];

export default newFeeds;
