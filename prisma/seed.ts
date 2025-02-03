import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create three dummy users
  const user1 = await prisma.user.upsert({
    where: { login: 'user_1' },
    update: {},
    create: {
      id: 'b2a93819-d28c-465c-9402-a612fec77f85',
      login: 'user_1',
      password: 'qwerty',
      version: 1,
      createdAt: 1733915529813,
      updatedAt: 1733915529813,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { login: 'user_2' },
    update: {},
    create: {
      id: 'ab702e67-e03d-4e32-98ae-5a29a9b1b3b3',
      login: 'user_2',
      password: 'qwerty123',
      version: 1,
      createdAt: 1733915529813,
      updatedAt: 1733915529813,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { login: 'user_3' },
    update: {},
    create: {
      id: '200ddd8e-3871-4095-a439-c40269aea4ef',
      login: 'user_3',
      password: 'asdfgh',
      version: 1,
      createdAt: 1733915529813,
      updatedAt: 1733915529813,
    },
  });

  console.log({ user1, user2, user3 });

  // create three dummy artists
  const artist1 = await prisma.artist.upsert({
    where: { id: '8f86d9c4-b057-47d2-aaf7-66c9945877e6' },
    update: {},
    create: {
      id: '8f86d9c4-b057-47d2-aaf7-66c9945877e6',
      name: 'Artist 1',
      grammy: true,
    },
  });

  const artist2 = await prisma.artist.upsert({
    where: { id: 'a9836edd-eb9e-4699-9e25-ae67c089bba3' },
    update: {},
    create: {
      id: 'a9836edd-eb9e-4699-9e25-ae67c089bba3',
      name: 'Artist 2',
      grammy: false,
    },
  });

  const artist3 = await prisma.artist.upsert({
    where: { id: '3f215d85-81f9-4a2b-842f-5ce418ff3006' },
    update: {},
    create: {
      id: '3f215d85-81f9-4a2b-842f-5ce418ff3006',
      name: 'Artist 3',
      grammy: true,
    },
  });

  console.log({ artist1, artist2, artist3 });

  // create three dummy albums
  const album1 = await prisma.album.upsert({
    where: { id: '495b9ffb-687b-401a-9b10-a1a764e9deca' },
    update: {},
    create: {
      id: '495b9ffb-687b-401a-9b10-a1a764e9deca',
      name: 'Album 1',
      year: 2023,
      artistId: null,
    },
  });

  const album2 = await prisma.album.upsert({
    where: { id: '0b7f1be2-cd52-4643-8aef-8740b221dc81' },
    update: {},
    create: {
      id: '0b7f1be2-cd52-4643-8aef-8740b221dc81',
      name: 'Album 2',
      year: 2024,
      artistId: null,
    },
  });

  console.log({ album1, album2 });

  // create three dummy albums
  const track1 = await prisma.track.upsert({
    where: { id: '6cd3cdca-b31e-4911-8c22-9d08c42b01b4' },
    update: {},
    create: {
      id: '6cd3cdca-b31e-4911-8c22-9d08c42b01b4',
      name: 'Track 1',
      albumId: null,
      artistId: null,
      duration: 30,
    },
  });

  const track2 = await prisma.track.upsert({
    where: { id: '66b3d77f-6238-4f2d-ba6f-b3697e03b5aa' },
    update: {},
    create: {
      id: '66b3d77f-6238-4f2d-ba6f-b3697e03b5aa',
      name: 'Track 2',
      albumId: null,
      artistId: null,
      duration: 90,
    },
  });

  const track3 = await prisma.track.upsert({
    where: { id: '283f7740-15b9-48af-b8d1-aa9dc39af8af' },
    update: {},
    create: {
      id: '283f7740-15b9-48af-b8d1-aa9dc39af8af',
      name: 'Track 3',
      albumId: null,
      artistId: null,
      duration: 60,
    },
  });

  console.log({ track1, track2, track3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
