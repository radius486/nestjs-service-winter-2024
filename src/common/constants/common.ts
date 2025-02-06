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

export const LOG_DIRECTORY_PATH = './src/logging/logs/';

export enum LOG_PATH {
  INFO = './src/logging/logs/info.csv',
  ERROR = './src/logging/logs/error.csv',
}

export enum LOG_TYPE {
  INFO = 'INFO',
  ERROR = 'ERROR',
}
