-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "Achievement" (
    "achievementID" SERIAL NOT NULL,
    "achievementCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "levels" INTEGER[],
    "levelsCriteria" INTEGER[],
    "statID" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("achievementID")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "senderID" INTEGER NOT NULL,
    "receiverID" INTEGER NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("senderID","receiverID")
);

-- CreateTable
CREATE TABLE "Friends" (
    "user1ID" INTEGER NOT NULL,
    "user2ID" INTEGER NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("user1ID","user2ID")
);

-- CreateTable
CREATE TABLE "Poop" (
    "poopID" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "type" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "colorID" INTEGER,
    "rating" DOUBLE PRECISION NOT NULL,
    "title" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Poop_pkey" PRIMARY KEY ("poopID")
);

-- CreateTable
CREATE TABLE "Stat" (
    "statID" SERIAL NOT NULL,
    "statCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("statID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "UserAchievements" (
    "userID" INTEGER NOT NULL,
    "achievementID" INTEGER NOT NULL,
    "achievedLevel" INTEGER NOT NULL DEFAULT 1,
    "achievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievements_pkey" PRIMARY KEY ("userID","achievementID")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "userID" INTEGER NOT NULL,
    "statID" INTEGER NOT NULL,
    "statValue" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("userID","statID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_achievementCode_key" ON "Achievement"("achievementCode");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_statID_key" ON "Achievement"("statID");

-- CreateIndex
CREATE UNIQUE INDEX "Stat_statCode_key" ON "Stat"("statCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_statID_fkey" FOREIGN KEY ("statID") REFERENCES "Stat"("statID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiverID_fkey" FOREIGN KEY ("receiverID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_user1ID_fkey" FOREIGN KEY ("user1ID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_user2ID_fkey" FOREIGN KEY ("user2ID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poop" ADD CONSTRAINT "Poop_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_achievementID_fkey" FOREIGN KEY ("achievementID") REFERENCES "Achievement"("achievementID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_statID_fkey" FOREIGN KEY ("statID") REFERENCES "Stat"("statID") ON DELETE CASCADE ON UPDATE CASCADE;
