// Execute: npx ts-node util/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.achievement.deleteMany();
    await prisma.friendRequest.deleteMany();
    await prisma.friends.deleteMany();
    await prisma.poop.deleteMany();
    await prisma.user.deleteMany();
    await prisma.userAchievements.deleteMany();

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
