-- CreateTable
CREATE TABLE "Achievement" (
    "achievementID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

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
    "type" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "colorID" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Poop_pkey" PRIMARY KEY ("poopID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "UserAchievements" (
    "userID" INTEGER NOT NULL,
    "achievementID" INTEGER NOT NULL,
    "achievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievements_pkey" PRIMARY KEY ("userID","achievementID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_name_key" ON "Achievement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

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
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_achievementID_fkey" FOREIGN KEY ("achievementID") REFERENCES "Achievement"("achievementID") ON DELETE RESTRICT ON UPDATE CASCADE;
