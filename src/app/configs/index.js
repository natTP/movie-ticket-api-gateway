import dotenv from 'dotenv'

dotenv.config()

export const {
  NODE_PORT,
  NODE_ENV,
  APP_ENV,
  URL_USER_SERVICE,
  URL_RESERVATION_SERVICE,
  URL_SHOWTIME_SERVICE,
} = process.env
