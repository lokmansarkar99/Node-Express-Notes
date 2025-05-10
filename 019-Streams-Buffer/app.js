import {createReadStream, createWriteStream} from 'fs'
import path from 'path'

const inputPath = path.join(import.meta.dirname, 'input.txt')

const outputPath = path.join(import.meta.dirname, 'output.txt')

const readableStream = createReadStream(inputPath, {encoding: 'utf-8', highWaterMark: 16})

const writableStream = createWriteStream(outputPath)

// readableStream.pipe(writableStream)


// listen for data  chunks


readableStream.on("data", (chunk) => {
    console.log("Buffer (chunk):" ,Buffer.from(chunk)  ) // convert the chunk to a buffer
    console.log("Received Chunk: ", chunk) // logs each 16 byte chunk

    writableStream.write(chunk)  // write each chunk to output file
})


//Handle stream end
readableStream.on("end", () => {
    console.log("File read completed")
    writableStream.end()
})