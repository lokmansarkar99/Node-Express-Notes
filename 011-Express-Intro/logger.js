import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Manually create __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// const filename = new URL(import.meta.url).pathname

// console.log(filename)

const logger = async function (req, res, next) {
  const filePath = path.join(__dirname, 'log.txt')

  try {
    await fs.writeFile(filePath, `Server running on - log for Middleware route - ${Date.now()}\n`, { flag: 'a' })
    console.log("Log file created")
  } catch (error) {
    console.error("Error writing to log file", error)
  }

  next() // Make sure the request continues to next middleware/route
}

export default logger
