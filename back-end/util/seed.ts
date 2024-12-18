// Execute: npx ts-node util/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.achievement.deleteMany();
    await prisma.friendRequest.deleteMany();
    await prisma.friends.deleteMany();
    await prisma.poop.deleteMany();
    await prisma.stat.deleteMany();
    await prisma.user.deleteMany();
    await prisma.userAchievements.deleteMany();
    await prisma.userStats.deleteMany();

    //#region STATS
    const amountOfFriends = await prisma.stat.create({
        data: {
            statCode: 'S1',
            name: 'Amount of friends',
            description: 'The amount of friends a user has.',
        },
    });
    const amountOfIncomingFriendRequests = await prisma.stat.create({
        data: {
            statCode: 'S2',
            name: 'Amount of incoming friendrequests',
            description: 'The amount of incoming friendrequests a user has.',
        },
    });
    const amountOfOutgoingFriendRequests = await prisma.stat.create({
        data: {
            statCode: 'S3',
            name: 'Amount of outgoing friendrequests',
            description: 'The amount of outgoing friendrequests a user has.',
        },
    });
    const amountOfRefusedFriendRequests = await prisma.stat.create({
        data: {
            statCode: 'S4',
            name: 'Amount of refused friendrequests',
            description: 'The amount of refused friendrequests a user has.',
        },
    });
    const amountOfPoops = await prisma.stat.create({
        data: {
            statCode: 'S5',
            name: 'Amount of poops',
            description: 'The amount of poops a user has.',
        },
    });
    const amountOfPerfectPoops = await prisma.stat.create({
        data: {
            statCode: 'S6',
            name: 'Amount of perfect poops',
            description: 'The amount of poops with a max rating of 5 the user has.',
        },
    });
    const amountOfPoopsWithLocation = await prisma.stat.create({
        data: {
            statCode: 'S7',
            name: 'Amount of poops with location',
            description: 'The amount of poops of which the location is known.',
        },
    });
    const stats = [
        amountOfFriends,
        amountOfIncomingFriendRequests,
        amountOfOutgoingFriendRequests,
        amountOfRefusedFriendRequests,
        amountOfPoops,
        amountOfPerfectPoops,
        amountOfPoopsWithLocation,
    ];
    //#endregion

    //#region ACHIEVEMENTS
    const poopfluencer = await prisma.achievement.create({
        data: {
            achievementCode: 'A1',
            name: 'Poopfluencer',
            description: JSON.stringify({
                english:
                    'You may know me from Poop-Tok, Poopstagram or FacePoop. (have a certain amount of friends)',
                nederlands:
                    'Je kent mij misschien van Tik-Kak, Kakstagram of KakBook. (heb een bepaald aantal vrienden)',
            }),
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            stat: { connect: { statID: amountOfFriends.statID } },
        },
    });
    const highClass = await prisma.achievement.create({
        data: {
            achievementCode: 'A2',
            name: 'High Class',
            description: JSON.stringify({
                english:
                    "I'm so popular, everyone wants to be my friend. (have a certain amount of incoming friendrequests)",
                nederlands:
                    'Ik ben zo populair, iedereen wil mijn vriend zijn. (heb een bepaald aantal inkomende vriendschapsverzoeken)',
            }),
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            stat: { connect: { statID: amountOfIncomingFriendRequests.statID } },
        },
    });
    const desperate = await prisma.achievement.create({
        data: {
            achievementCode: 'A3',
            name: 'Desperate',
            description: JSON.stringify({
                english:
                    'I keep pooping on my own ~ Calum Poops-a-lot. (have a certain amount of outgoing friendrequests)',
                nederlands:
                    'Ik blijf kakken op mijn eentje ~ Kaka Scott. (heb een bepaald aantal niet-geaccepteerde vriendschapsverzoeken)',
            }),
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            stat: { connect: { statID: amountOfOutgoingFriendRequests.statID } },
        },
    });
    const pooplander = await prisma.achievement.create({
        data: {
            achievementCode: 'A4',
            name: 'Pooplander',
            description: JSON.stringify({
                english:
                    "I'm stronger, I'm smarter, I'm better, I am better! (have a certain amount of refused friendrequests)",
                nederlands:
                    'Ik ben sterker, ik ben slimmer, ik ben beter, IK BEN BETER!. (heb een bepaald aantal afgewezen vriendschapsverzoeken)',
            }),
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            stat: { connect: { statID: amountOfRefusedFriendRequests.statID } },
        },
    });
    const poopLord = await prisma.achievement.create({
        data: {
            achievementCode: 'A5',
            name: 'Poop Lord',
            description: JSON.stringify({
                english: 'Veni, Vidi, Cacavi. (have a certain amount of poops)',
                nederlands: 'Veni, Vidi, Cacavi. (heb een bepaald aantal kakas)',
            }),
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            stat: { connect: { statID: amountOfPoops.statID } },
        },
    });
    const perfecation = await prisma.achievement.create({
        data: {
            achievementCode: 'A6',
            name: 'Perfecation',
            description: JSON.stringify({
                english:
                    'I see no one up here, other than me. (have a certain amount of perfect poops)',
                nederlands:
                    'Ik zie niemand hierboven, behalve ik. (heb een bepaald aantal perfecte kakas)',
            }),
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            stat: { connect: { statID: amountOfPerfectPoops.statID } },
        },
    });
    const publicPooper = await prisma.achievement.create({
        data: {
            achievementCode: 'A7',
            name: 'Public Pooper',
            description: JSON.stringify({
                english:
                    'Everyone shall know where I have pooped. (have a certain amount of poops with known location)',
                nederlands:
                    'Iedereen zal weten waar ik kaka heb gedaan. (heb een bepaald aantal kakas met locatie)',
            }),
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            stat: { connect: { statID: amountOfPoopsWithLocation.statID } },
        },
    });
    const achievements = [
        poopfluencer,
        highClass,
        desperate,
        pooplander,
        poopLord,
        perfecation,
        publicPooper,
    ];
    //#endregion

    //#region USERS
    const admin = await prisma.user.create({
        data: {
            username: 'Admin',
            email: 'admin@poopedia.com',
            password: await bcrypt.hash('Admin!123', 12),
            role: 'ADMIN',
            // poops: {
            //     create: {
            //         //create a poop here
            //     },
            //     connect: [{ id: foo.id }, { id: bar.id }],
            // },
        },
    });
    const moderator = await prisma.user.create({
        data: {
            username: 'moderator',
            email: 'moderator@poopedia.com',
            password: await bcrypt.hash('Moderator!123', 12),
            role: 'MODERATOR',
        },
    });
    const user1 = await prisma.user.create({
        data: {
            username: 'user1',
            email: 'user1@poopedia.com',
            password: await bcrypt.hash('User1!123', 12),
            role: 'USER',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            username: 'user2',
            email: 'user2@poopedia.com',
            password: await bcrypt.hash('User2!123', 12),
            role: 'USER',
        },
    });
    const user3 = await prisma.user.create({
        data: {
            username: 'user3',
            email: 'user3@poopedia.com',
            password: await bcrypt.hash('User3!123', 12),
            role: 'USER',
        },
    });
    const user4 = await prisma.user.create({
        data: {
            username: 'user4',
            email: 'user4@poopedia.com',
            password: await bcrypt.hash('User4!123', 12),
            role: 'USER',
        },
    });
    const user5 = await prisma.user.create({
        data: {
            username: 'user5',
            email: 'user5@poopedia.com',
            password: await bcrypt.hash('User5!123', 12),
            role: 'USER',
        },
    });
    const users = [admin, moderator, user1, user2, user3, user4, user5];
    //#endregion

    //#region POOPS
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 4,
            size: 50,
            rating: 4,
            colorID: 0,
            title: 'Poop and Scoot.',
            longitude: 4.724166822996737,
            latitude: 50.880434297929774,
            user: { connect: { userID: user1.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 4,
            size: 50,
            rating: 4,
            colorID: 0,
            title: 'Drop and Drive.',
            longitude: null,
            latitude: null,
            user: { connect: { userID: user1.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 2,
            size: 80,
            rating: 2,
            colorID: 0,
            title: 'Incontinentia Pooptocks.',
            longitude: 4.731953220736576,
            latitude: 50.93708586970979,
            user: { connect: { userID: user2.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 2,
            size: 80,
            rating: 2,
            colorID: 0,
            title: 'Biggus Poopus.',
            longitude: null,
            latitude: null,
            user: { connect: { userID: user2.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 1,
            size: 10,
            rating: 3,
            colorID: 0,
            title: 'Rip ass and gass.',
            longitude: 4.824166822996737,
            latitude: 50.280434297929774,
            user: { connect: { userID: user3.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 1,
            size: 60,
            rating: 4.5,
            colorID: 0,
            title: 'Shart and depart.',
            longitude: null,
            latitude: null,
            user: { connect: { userID: user3.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 3,
            size: 74,
            rating: 2.5,
            colorID: 0,
            title: 'Shit and Skeddadle.',
            longitude: 4.554166822996737,
            latitude: 50.550434297929774,
            user: { connect: { userID: user4.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 3,
            size: 2,
            rating: 5,
            colorID: 0,
            title: 'Leave a big one and go away man.',
            longitude: null,
            latitude: null,
            user: { connect: { userID: user4.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 5,
            size: 99,
            rating: 3.5,
            colorID: 0,
            title: 'Push one out and go about.',
            longitude: 4.744166822996737,
            latitude: 50.895434297929774,
            user: { connect: { userID: user5.userID } },
        },
    });
    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 5,
            size: 43,
            rating: 4,
            colorID: 0,
            title: 'Drop a bomb and leave therefrom.',
            longitude: null,
            latitude: null,
            user: { connect: { userID: user5.userID } },
        },
    });
    //#endregion

    //#region FRIENDS
    await prisma.friendRequest.create({
        data: {
            sender: { connect: { userID: user1.userID } },
            receiver: { connect: { userID: user2.userID } },
        },
    });
    await prisma.friendRequest.create({
        data: {
            sender: { connect: { userID: user3.userID } },
            receiver: { connect: { userID: user1.userID } },
        },
    });

    await prisma.friends.create({
        data: {
            user1: { connect: { userID: user1.userID } },
            user2: { connect: { userID: user4.userID } },
        },
    });
    await prisma.friends.create({
        data: {
            user1: { connect: { userID: user5.userID } },
            user2: { connect: { userID: user1.userID } },
        },
    });
    //#endregion

    //#region  CONNECT ACHIEVEMENT <-> USER
    users.forEach(async (user) => {
        achievements.forEach(async (achievement) => {
            await prisma.userAchievements.create({
                data: {
                    userID: user.userID,
                    achievementID: achievement.achievementID,
                },
            });
        });
    });
    //#endregion

    //#region  CONNECT STAT <-> USER
    const values = [5, 15, 25, 55];
    users.forEach(async (user) => {
        stats.forEach(async (stat) => {
            const randomIndex = Math.floor(Math.random() * 4);

            await prisma.userStats.create({
                data: {
                    userID: user.userID,
                    statID: stat.statID,
                    statValue: values[randomIndex],
                },
            });
        });
    });
    //#endregion
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
