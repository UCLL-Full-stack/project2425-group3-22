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

    const admin = await prisma.user.create({
        data: {
            username: 'Admin',
            email: 'admin@poopedia.com',
            password: await bcrypt.hash('admin!123', 12),
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
            password: await bcrypt.hash('moderator!123', 12),
            role: 'MODERATOR',
        },
    });
    const user1 = await prisma.user.create({
        data: {
            username: 'user1',
            email: 'user1@poopedia.com',
            password: await bcrypt.hash('user1!123', 12),
            role: 'USER',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            username: 'user2',
            email: 'user2@poopedia.com',
            password: await bcrypt.hash('user2!123', 12),
            role: 'USER',
        },
    });
    const user3 = await prisma.user.create({
        data: {
            username: 'user3',
            email: 'user3@poopedia.com',
            password: await bcrypt.hash('user3!123', 12),
            role: 'USER',
        },
    });
    const user4 = await prisma.user.create({
        data: {
            username: 'user4',
            email: 'user4@poopedia.com',
            password: await bcrypt.hash('user4!123', 12),
            role: 'USER',
        },
    });

    await prisma.poop.create({
        data: {
            dateTime: new Date(),
            type: 4,
            size: 50,
            rating: 4,
            colorID: 0,
            title: 'poop1',
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
            title: 'poop1',
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
            title: 'Big poop',
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
            title: 'Big poop',
            longitude: null,
            latitude: null,
            user: { connect: { userID: user2.userID } },
        },
    });

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
