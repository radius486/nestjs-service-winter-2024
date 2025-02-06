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
  LOG = './src/logging/logs/log.csv',
  ERROR = './src/logging/logs/error.csv',
  WARNING = './src/logging/logs/warning.csv',
}

export enum LOG_TYPE {
  LOG = 'LOG',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

export enum LOG_LEVEL {
  ERROR = 0,
  WARNING = 1,
  LOG = 2,
}
