import dotenv from 'dotenv'
dotenv.config()

import { z } from 'zod'

const portSchema = z.coerce.number().min(3000).max(5000).default(3000)

const PORT = portSchema.parse(process.env.PORT)

export default PORT
