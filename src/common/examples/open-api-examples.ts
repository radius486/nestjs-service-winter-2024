export const userExample = {
  id: 'b2a93819-d28c-465c-9402-a612fec77f85',
  login: 'user_1',
  version: 1,
  createdAt: 1733915529813,
  updatedAt: 1733915529813,
};

export const trackExample = {
  id: '6cd3cdca-b31e-4911-8c22-9d08c42b01b4',
  name: 'Track 1',
  artistId: null,
  albumId: null,
  duration: 30,
};

export const artistExample = {
  id: '8f86d9c4-b057-47d2-aaf7-66c9945877e6',
  name: 'Artist 1',
  grammy: true,
};

export const albumExample = {
  id: '495b9ffb-687b-401a-9b10-a1a764e9deca',
  name: 'Album 1',
  year: 2023,
  artistId: null,
};

export const favoritesExample = {
  artists: [artistExample],
  albums: [albumExample],
  tracks: [trackExample],
};
