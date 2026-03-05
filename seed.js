// seed.js – Database seeder with sample data
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Channel = require("./models/Channel");
const Video = require("./models/Video");
const Comment = require("./models/Comment");
dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");

        // Clear existing data
        await Comment.deleteMany({});
        await Video.deleteMany({});
        await Channel.deleteMany({});
        await User.deleteMany({});
        console.log("Cleared existing data.");

        // Create users (password will be hashed by the pre-save hook)
        const users = await User.create([
            {
                username: "JohnDoe",
                email: "john@example.com",
                password: "password123",
                avatar: "https://ui-avatars.com/api/?name=John+Doe&background=FF0000&color=fff&size=128",
            },
            {
                username: "JaneSmith",
                email: "jane@example.com",
                password: "password123",
                avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=4285F4&color=fff&size=128",
            },
            {
                username: "TechGuru",
                email: "tech@example.com",
                password: "password123",
                avatar: "https://ui-avatars.com/api/?name=Tech+Guru&background=0F9D58&color=fff&size=128",
            },
        ]);

        console.log("Users created.");

        // Create channels
        const channels = await Channel.create([
            {
                channelName: "Code with John",
                owner: users[0]._id,
                description: "Coding tutorials and tech reviews by John Doe.",
                channelBanner: "https://placehold.co/1200x300/FF0000/FFFFFF?text=Code+with+John",
                subscribers: 5200,
            },
            {
                channelName: "Jane's Music Hub",
                owner: users[1]._id,
                description: "Music covers, playlists, and music theory lessons.",
                channelBanner: "https://placehold.co/1200x300/4285F4/FFFFFF?text=Jane's+Music+Hub",
                subscribers: 12800,
            },
            {
                channelName: "TechGuru Reviews",
                owner: users[2]._id,
                description: "Latest tech reviews, unboxings, and comparisons.",
                channelBanner: "https://placehold.co/1200x300/0F9D58/FFFFFF?text=TechGuru+Reviews",
                subscribers: 34500,
            },
        ]);

        console.log("Channels created.");

        // Update users with their channel references
        await User.findByIdAndUpdate(users[0]._id, { $push: { channels: channels[0]._id } });
        await User.findByIdAndUpdate(users[1]._id, { $push: { channels: channels[1]._id } });
        await User.findByIdAndUpdate(users[2]._id, { $push: { channels: channels[2]._id } });

        // Create videos (using real YouTube embed URLs and thumbnails)
        const videosData = [
            {
                title: "Learn React in 30 Minutes",
                description: "A quick tutorial to get started with React. Perfect for beginners who want to understand components, props, and state.",
                videoUrl: "https://www.youtube.com/embed/hQAHSlTtcmY",
                thumbnailUrl: "https://img.youtube.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
                category: "Education",
                channel: channels[0]._id,
                uploader: users[0]._id,
                views: 15200,
            },
            {
                title: "JavaScript ES6+ Features Explained",
                description: "Deep dive into modern JavaScript features including arrow functions, destructuring, promises, and more.",
                videoUrl: "https://www.youtube.com/embed/NCwa_xi0Uuc",
                thumbnailUrl: "https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg",
                category: "Education",
                channel: channels[0]._id,
                uploader: users[0]._id,
                views: 23400,
            },
            {
                title: "Build a Full Stack App with MERN",
                description: "Complete guide to building a production-ready application with MongoDB, Express, React and Node.js.",
                videoUrl: "https://www.youtube.com/embed/7CqJlxBYj-M",
                thumbnailUrl: "https://img.youtube.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
                category: "Education",
                channel: channels[0]._id,
                uploader: users[0]._id,
                views: 8900,
            },
            {
                title: "Lofi Hip Hop Radio - Beats to Relax/Study To",
                description: "Chill lofi beats perfect for studying, coding, or relaxing. Enjoy the vibes!",
                videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
                thumbnailUrl: "https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
                category: "Music",
                channel: channels[1]._id,
                uploader: users[1]._id,
                views: 1250000,
            },
            {
                title: "Top 10 Guitar Riffs of All Time",
                description: "Exploring the greatest guitar riffs in rock history. From classic rock to modern metal.",
                videoUrl: "https://www.youtube.com/embed/DmeUuoxTJdg",
                thumbnailUrl: "https://img.youtube.com/vi/DmeUuoxTJdg/maxresdefault.jpg",
                category: "Music",
                channel: channels[1]._id,
                uploader: users[1]._id,
                views: 67200,
            },
            {
                title: "iPhone 16 Pro Max Review - The Ultimate Smartphone?",
                description: "Full review of Apple's latest flagship. Camera test, performance benchmarks, and battery life comparison.",
                videoUrl: "https://www.youtube.com/embed/dtp6b76pMak",
                thumbnailUrl: "https://img.youtube.com/vi/dtp6b76pMak/maxresdefault.jpg",
                category: "Science & Tech",
                channel: channels[2]._id,
                uploader: users[2]._id,
                views: 456000,
            },
            {
                title: "Best Gaming Setup Tour 2024",
                description: "Check out my ultimate gaming setup! RGB lights, ultrawide monitors, and custom PC build.",
                videoUrl: "https://www.youtube.com/embed/G6dMioYm-lk",
                thumbnailUrl: "https://img.youtube.com/vi/G6dMioYm-lk/maxresdefault.jpg",
                category: "Gaming",
                channel: channels[2]._id,
                uploader: users[2]._id,
                views: 89300,
            },
            {
                title: "Top 10 Goals in Football History",
                description: "The most incredible, jaw-dropping goals ever scored on the football pitch.",
                videoUrl: "https://www.youtube.com/embed/JgSNSpoGFQo",
                thumbnailUrl: "https://img.youtube.com/vi/JgSNSpoGFQo/maxresdefault.jpg",
                category: "Sports",
                channel: channels[1]._id,
                uploader: users[1]._id,
                views: 342000,
            },
            {
                title: "Breaking News: AI Takes Over the World",
                description: "Just kidding! But AI is changing everything. Here's a roundup of the biggest AI news this week.",
                videoUrl: "https://www.youtube.com/embed/cdiD-9MMpb0",
                thumbnailUrl: "https://img.youtube.com/vi/cdiD-9MMpb0/maxresdefault.jpg",
                category: "News",
                channel: channels[2]._id,
                uploader: users[2]._id,
                views: 125600,
            },
            {
                title: "Stand-Up Comedy Special: Tech Edition",
                description: "When programmers do stand-up comedy. Jokes about bugs, deadlines, and stack overflow.",
                videoUrl: "https://www.youtube.com/embed/nzIKSkbPlYE",
                thumbnailUrl: "https://img.youtube.com/vi/nzIKSkbPlYE/maxresdefault.jpg",
                category: "Entertainment",
                channel: channels[0]._id,
                uploader: users[0]._id,
                views: 78200,
            },
            {
                title: "Minecraft Survival Let's Play - Episode 1",
                description: "Starting a brand new Minecraft survival world! Join me on this adventure.",
                videoUrl: "https://www.youtube.com/embed/bUZN6hCfKyE",
                thumbnailUrl: "https://img.youtube.com/vi/bUZN6hCfKyE/maxresdefault.jpg",
                category: "Gaming",
                channel: channels[2]._id,
                uploader: users[2]._id,
                views: 203000,
            },
            {
                title: "CSS Grid vs Flexbox - When to Use What",
                description: "A comprehensive comparison of CSS Grid and Flexbox with practical examples.",
                videoUrl: "https://www.youtube.com/embed/hs3piaN4b5I",
                thumbnailUrl: "https://img.youtube.com/vi/hs3piaN4b5I/maxresdefault.jpg",
                category: "Education",
                channel: channels[0]._id,
                uploader: users[0]._id,
                views: 45100,
            },
            {
                title: "Epic Mountain Biking Trail Ride",
                description: "Riding the most extreme mountain biking trails in the world. GoPro POV footage.",
                videoUrl: "https://www.youtube.com/embed/ygGrMcEz3Jk",
                thumbnailUrl: "https://img.youtube.com/vi/ygGrMcEz3Jk/maxresdefault.jpg",
                category: "Sports",
                channel: channels[1]._id,
                uploader: users[1]._id,
                views: 198000,
            },
            {
                title: "How AI is Revolutionizing Healthcare",
                description: "Exploring how artificial intelligence is transforming diagnostics, drug discovery, and patient care.",
                videoUrl: "https://www.youtube.com/embed/Gbnep6RJinQ",
                thumbnailUrl: "https://img.youtube.com/vi/Gbnep6RJinQ/maxresdefault.jpg",
                category: "Science & Tech",
                channel: channels[2]._id,
                uploader: users[2]._id,
                views: 312000,
            },
        ];

        const videos = await Video.create(videosData);
        console.log("Videos created.");

        // Update channels with video references
        for (const video of videos) {
            await Channel.findByIdAndUpdate(video.channel, {
                $push: { videos: video._id },
            });
        }

        // Create sample comments
        const comments = await Comment.create([
            {
                video: videos[0]._id,
                user: users[1]._id,
                text: "Great video! Very helpful for beginners. I learned so much in just 30 minutes!",
            },
            {
                video: videos[0]._id,
                user: users[2]._id,
                text: "Can you make a follow-up tutorial on React hooks? That would be amazing!",
            },
            {
                video: videos[3]._id,
                user: users[0]._id,
                text: "This is my go-to study music. Helps me focus so much while coding!",
            },
            {
                video: videos[5]._id,
                user: users[0]._id,
                text: "The camera on this phone is insane! Great review as always.",
            },
            {
                video: videos[5]._id,
                user: users[1]._id,
                text: "Waiting for the comparison with Samsung. Please do one soon!",
            },
            {
                video: videos[6]._id,
                user: users[0]._id,
                text: "That RGB setup is fire! What monitor arm are you using?",
            },
            {
                video: videos[1]._id,
                user: users[2]._id,
                text: "The destructuring section was explained perfectly. Subscribed!",
            },
            {
                video: videos[7]._id,
                user: users[2]._id,
                text: "Goal number 3 is still the greatest goal I've ever seen live!",
            },
        ]);

        console.log("Comments created.");

        // Add some likes to videos
        await Video.findByIdAndUpdate(videos[0]._id, { likes: [users[1]._id, users[2]._id] });
        await Video.findByIdAndUpdate(videos[3]._id, { likes: [users[0]._id, users[2]._id] });
        await Video.findByIdAndUpdate(videos[5]._id, { likes: [users[0]._id, users[1]._id], dislikes: [users[2]._id] });

        console.log("\n✅ Database seeded successfully!");
        console.log(`   - ${users.length} Users`);
        console.log(`   - ${channels.length} Channels`);
        console.log(`   - ${videos.length} Videos`);
        console.log(`   - ${comments.length} Comments`);
        console.log("\n📧 Login credentials:");
        console.log("   john@example.com / password123");
        console.log("   jane@example.com / password123");
        console.log("   tech@example.com / password123");

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDB();
