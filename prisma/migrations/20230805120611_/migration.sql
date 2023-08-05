-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "duration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favs" (
    "tracks" TEXT[],
    "albums" TEXT[],
    "artists" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Favs_tracks_key" ON "Favs"("tracks");

-- CreateIndex
CREATE UNIQUE INDEX "Favs_albums_key" ON "Favs"("albums");

-- CreateIndex
CREATE UNIQUE INDEX "Favs_artists_key" ON "Favs"("artists");
