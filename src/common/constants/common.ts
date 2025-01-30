export enum INSTANCE_TYPES {
  USER = 'user',
  TRACK = 'track',
  ALBUM = 'album',
  ARTIST = 'artist',
}

export enum JWT_ERROR_NAMES {
  TOKEN_EXPIRED_ERROR = 'TokenExpiredError',
  JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError',
}

export const REFRESH_TOKEN_DELAY = 1000;
