//Top level await with fetch and jsonplaceholder

// const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
// const data = await response.json()
// console.log(data)

// fix __dirname issue in ES modules
// import { fileURLToPath } from 'url'
// import path from 'path'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// console.log(__dirname) // prints the directory name of the current module
// console.log(__filename) // prints the full path of the current module


//print file name
console.log(import.meta.filename)
// prints the full path of the current module
console.log(import.meta.dirname) // prints the directory name of the current module
console.log(import.meta.url) // prints the URL of the current module

// create a file 

import fs from 'fs/promises'     
import path from 'path'

const createFile = async() => {
    try {
        const filePath= path.join(import.meta.dirname, 'logFile.txt')

        await fs.writeFile(filePath, `Server running on - log for Middleware route - ${Date.now()}\n`, { flag: 'a' })
        console.log("Log file created")
    }
    catch (error) {
        console.error("Error writing to log file", error)
    }
    finally {
        console.log("File created")
    }
}

// createFile()

const readFile = async () => {
    try {
       
         const data = await fs.readFile(path.join(import.meta.dirname, 'logFile.txt'), 'utf-8')
        console.log(data)
        console.log("File read successfully")
    } catch (error) {
        console.error("Error reading file", error)
        
    }
}


//  readFile()


const appendFile = async () => { 

    try {
        const filePath = path.join(import.meta.dirname, 'logFile.txt')
        await fs.appendFile(filePath, `Server running on update - log for Middleware route - ${Date.now()}\n`, { flag: 'a' })
        console.log("Log file appended")
    } catch (error) {
        console.error("Error appending to log file", error)
    }
}

//  appendFile()

const deleteFile = async () => {
    try {
        const filePath = path.join(import.meta.dirname, 'logFile.txt')
        await fs.unlink(filePath)
        console.log("Log file deleted")
    } catch (error) {
        console.error("Error deleting log file", error)
    }
 }

// deleteFile()