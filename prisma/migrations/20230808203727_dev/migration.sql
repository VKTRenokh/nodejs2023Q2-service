/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavAlbum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavArtist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Track` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Album";

-- DropTable
DROP TABLE "public"."Artist";

-- DropTable
DROP TABLE "public"."FavAlbum";

-- DropTable
DROP TABLE "public"."FavArtist";

-- DropTable
DROP TABLE "public"."FavTrack";

-- DropTable
DROP TABLE "public"."Track";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "password" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavTrack" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavArtist" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavAlbum" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavTrack_id_key" ON "FavTrack"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavArtist_id_key" ON "FavArtist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavAlbum_id_key" ON "FavAlbum"("id");
