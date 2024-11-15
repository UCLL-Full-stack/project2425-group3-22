// Execute: npx ts-node util/seed.ts
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './hash';

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
            password: await hashPassword('admin!123'),
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
            password: await hashPassword('moderator!123'),
            role: 'MODERATOR',
        },
    });
    const user1 = await prisma.user.create({
        data: {
            username: 'user1',
            email: 'user1@poopedia.com',
            password: await hashPassword('user1!123'),
            role: 'USER',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            username: 'user2',
            email: 'user2@poopedia.com',
            password: await hashPassword('user2!123'),
            role: 'USER',
        },
    });

    await prisma.poop.create({
        data: {
            type: 4,
            size: 50,
            dateTime: new Date(),
            user: { connect: { userID: user1.userID } },
            colorID: 0,
            title: 'poop1',
            rating: 4,
            longitude: 4.724166822996737,
            latitude: 50.880434297929774,
        },
    });
    await prisma.poop.create({
        data: {
            type: 2,
            size: 80,
            dateTime: new Date(),
            user: { connect: { userID: user2.userID } },
            colorID: 0,
            title: 'Big poop',
            rating: 2,
            longitude: 4.731953220736576,
            latitude: 50.93708586970979,
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
