// seed.js – Database seeder with sample data
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";
import Comment from "./models/Comments.js";

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

            /* EDUCATION */
            
            {
            title: "Learn React in 30 Minutes",
            description: "Quick beginner React tutorial.",
            videoUrl: "https://www.youtube.com/embed/hQAHSlTtcmY",
            thumbnailUrl: "https://img.youtube.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
            category: "Education",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 15000
            },
            
            {
            title: "JavaScript ES6 Explained",
            description: "Modern JS features explained clearly.",
            videoUrl: "https://www.youtube.com/embed/NCwa_xi0Uuc",
            thumbnailUrl: "https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg",
            category: "Education",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 22000
            },
            
            {
            title: "CSS Grid vs Flexbox",
            description: "When to use CSS Grid or Flexbox.",
            videoUrl: "https://www.youtube.com/embed/hs3piaN4b5I",
            thumbnailUrl: "https://img.youtube.com/vi/hs3piaN4b5I/maxresdefault.jpg",
            category: "Education",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 45000
            },
            
            {
            title: "Build MERN Stack App",
            description: "Complete MERN stack tutorial.",
            videoUrl: "https://www.youtube.com/embed/7CqJlxBYj-M",
            thumbnailUrl: "https://img.youtube.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
            category: "Education",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 9000
            },
            
            /* MUSIC */
            
            {
            title: "Lofi Hip Hop Radio",
            description: "Chill beats for coding and studying.",
            videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
            thumbnailUrl: "https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
            category: "Music",
            channel: channels[1]._id,
            uploader: users[1]._id,
            views: 1200000
            },
            
            {
            title: "Top Guitar Riffs",
            description: "Best guitar riffs ever made.",
            videoUrl: "https://www.youtube.com/embed/DmeUuoxTJdg",
            thumbnailUrl: "https://img.youtube.com/vi/DmeUuoxTJdg/maxresdefault.jpg",
            category: "Music",
            channel: channels[1]._id,
            uploader: users[1]._id,
            views: 67000
            },
            
            {
            title: "Epic Instrumental Music",
            description: "Motivational instrumental music.",
            videoUrl: "https://www.youtube.com/embed/WNeLUngb-Xg",
            thumbnailUrl: "https://img.youtube.com/vi/WNeLUngb-Xg/maxresdefault.jpg",
            category: "Music",
            channel: channels[1]._id,
            uploader: users[1]._id,
            views: 83000
            },
            
            {
            title: "Relaxing Piano Music",
            description: "Calm piano music for relaxation.",
            videoUrl: "https://www.youtube.com/embed/1ZYbU82GVz4",
            thumbnailUrl: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg",
            category: "Music",
            channel: channels[1]._id,
            uploader: users[1]._id,
            views: 90000
            },
            
            /* GAMING */
            
            {
            title: "Best Gaming Setup Tour",
            description: "Ultimate RGB gaming setup.",
            videoUrl: "https://www.youtube.com/embed/G6dMioYm-lk",
            thumbnailUrl: "https://img.youtube.com/vi/G6dMioYm-lk/maxresdefault.jpg",
            category: "Gaming",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 89000
            },
            
            {
            title: "Minecraft Survival Episode 1",
            description: "Starting new survival world.",
            videoUrl: "https://www.youtube.com/embed/bUZN6hCfKyE",
            thumbnailUrl: "https://img.youtube.com/vi/bUZN6hCfKyE/maxresdefault.jpg",
            category: "Gaming",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 203000
            },
            
            {
            title: "Valorant Gameplay Highlights",
            description: "Top Valorant plays.",
            videoUrl: "https://www.youtube.com/embed/hhhlGxj0y3M",
            thumbnailUrl: "https://img.youtube.com/vi/hhhlGxj0y3M/maxresdefault.jpg",
            category: "Gaming",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 78000
            },
            
            {
            title: "GTA 5 Crazy Stunts",
            description: "Amazing GTA 5 stunt compilation.",
            videoUrl: "https://www.youtube.com/embed/n3Xv_g3g-mA",
            thumbnailUrl: "https://img.youtube.com/vi/n3Xv_g3g-mA/maxresdefault.jpg",
            category: "Gaming",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 91000
            },
            
            /* SPORTS */
            
            {
            title: "Top 10 Football Goals",
            videoUrl: "https://www.youtube.com/embed/JgSNSpoGFQo",
            thumbnailUrl: "https://img.youtube.com/vi/JgSNSpoGFQo/maxresdefault.jpg",
            description: "Best football goals ever.",
            category: "Sports",
            channel: channels[1]._id,
            uploader: users[1]._id,
            views: 340000
            },
            
            {
            title: "Epic Mountain Biking",
            videoUrl: "https://www.youtube.com/embed/ygGrMcEz3Jk",
            thumbnailUrl: "https://img.youtube.com/vi/ygGrMcEz3Jk/maxresdefault.jpg",
            description: "Extreme biking trails.",
            category: "Sports",
            channel: channels[1]._id,
            uploader: users[1]._id,
            views: 198000
            },
            
            {
            title: "Best Cricket Moments",
            videoUrl: "https://www.youtube.com/embed/b9kK6sYx0n4",
            thumbnailUrl: "https://img.youtube.com/vi/b9kK6sYx0n4/maxresdefault.jpg",
            description: "Amazing cricket highlights.",
            category: "Sports",
            channel: channels[1]._id,
            uploader: users[1]._id,
            views: 210000
            },
            
            /* NEWS */
            
            {
            title: "AI Takes Over the World",
            videoUrl: "https://www.youtube.com/embed/cdiD-9MMpb0",
            thumbnailUrl: "https://img.youtube.com/vi/cdiD-9MMpb0/maxresdefault.jpg",
            description: "AI news roundup.",
            category: "News",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 120000
            },
            
            {
            title: "Global Tech News Today",
            videoUrl: "https://www.youtube.com/embed/qj8hX3y9s8A",
            thumbnailUrl: "https://img.youtube.com/vi/qj8hX3y9s8A/maxresdefault.jpg",
            description: "Latest technology updates.",
            category: "News",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 89000
            },
            
            {
            title: "World News Headlines",
            videoUrl: "https://www.youtube.com/embed/Yh0AhrY9GjA",
            thumbnailUrl: "https://img.youtube.com/vi/Yh0AhrY9GjA/maxresdefault.jpg",
            description: "Major world events today.",
            category: "News",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 110000
            },
            
            /* ENTERTAINMENT */
            
            {
            title: "Stand Up Comedy Tech Edition",
            videoUrl: "https://www.youtube.com/embed/nzIKSkbPlYE",
            thumbnailUrl: "https://img.youtube.com/vi/nzIKSkbPlYE/maxresdefault.jpg",
            description: "Programming jokes.",
            category: "Entertainment",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 78000
            },
            
            {
            title: "Funny Coding Memes",
            videoUrl: "https://www.youtube.com/embed/Wb4sC2C3zL4",
            thumbnailUrl: "https://img.youtube.com/vi/Wb4sC2C3zL4/maxresdefault.jpg",
            description: "Developer memes compilation.",
            category: "Entertainment",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 56000
            },
            
            {
            title: "Best Movie Trailers 2024",
            videoUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
            thumbnailUrl: "https://img.youtube.com/vi/EXeTwQWrcwY/maxresdefault.jpg",
            description: "Upcoming movie trailers.",
            category: "Entertainment",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 130000
            },
            
            /* SCIENCE & TECH */
            
            {
            title: "iPhone 16 Pro Max Review",
            videoUrl: "https://www.youtube.com/embed/dtp6b76pMak",
            thumbnailUrl: "https://img.youtube.com/vi/dtp6b76pMak/maxresdefault.jpg",
            description: "Full smartphone review.",
            category: "Science & Tech",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 456000
            },
            
            {
            title: "How AI is Revolutionizing Healthcare",
            videoUrl: "https://www.youtube.com/embed/Gbnep6RJinQ",
            thumbnailUrl: "https://img.youtube.com/vi/Gbnep6RJinQ/maxresdefault.jpg",
            description: "AI in healthcare industry.",
            category: "Science & Tech",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 312000
            },
            
            {
            title: "Future of Artificial Intelligence",
            videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
            thumbnailUrl: "https://img.youtube.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
            description: "What AI will look like in 2030.",
            category: "Science & Tech",
            channel: channels[2]._id,
            uploader: users[2]._id,
            views: 205000
            },
            
            /* COMEDY */
            
            {
            title: "Funny Cat Compilation",
            videoUrl: "https://www.youtube.com/embed/J---aiyznGQ",
            thumbnailUrl: "https://img.youtube.com/vi/J---aiyznGQ/maxresdefault.jpg",
            description: "Cats doing hilarious things.",
            category: "Comedy",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 900000
            },
            
            {
            title: "Try Not To Laugh Challenge",
            videoUrl: "https://www.youtube.com/embed/L_jWHffIx5E",
            thumbnailUrl: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg",
            description: "Impossible laughing challenge.",
            category: "Comedy",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 450000
            },
            
            {
            title: "Comedy Pranks Compilation",
            videoUrl: "https://www.youtube.com/embed/xvFZjo5PgG0",
            thumbnailUrl: "https://img.youtube.com/vi/xvFZjo5PgG0/maxresdefault.jpg",
            description: "Funniest prank moments.",
            category: "Comedy",
            channel: channels[0]._id,
            uploader: users[0]._id,
            views: 320000
            }
            
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
