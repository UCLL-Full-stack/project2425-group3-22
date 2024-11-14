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
            password: 'toBeHashed',
            role: 'ADMIN',
            // poops: {
            //     create: {
            //         //create a poop here
            //     },
            //     connect: [{ id: foo.id }, { id: bar.id }],
            // },
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
