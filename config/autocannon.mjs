import dotenv from 'dotenv'
dotenv.config()

export const amount = Number(process.env.AC_AMOUNT)
export const connections = Number(process.env.AC_CONNECTIONS)
export const workers = Number(process.env.AC_WORKERS)
