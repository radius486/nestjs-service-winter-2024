-- CreateTable
CREATE TABLE "FavoriteArtists" (
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavoriteArtists_pkey" PRIMARY KEY ("artistId")
);

-- CreateTable
CREATE TABLE "FavoriteAlbums" (
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavoriteAlbums_pkey" PRIMARY KEY ("albumId")
);

-- CreateTable
CREATE TABLE "FavoriteTracks" (
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavoriteTracks_pkey" PRIMARY KEY ("trackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtists_artistId_key" ON "FavoriteArtists"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAlbums_albumId_key" ON "FavoriteAlbums"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTracks_trackId_key" ON "FavoriteTracks"("trackId");

-- AddForeignKey
ALTER TABLE "FavoriteArtists" ADD CONSTRAINT "FavoriteArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbums" ADD CONSTRAINT "FavoriteAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteTracks" ADD CONSTRAINT "FavoriteTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
