//Node JS CLI File Creation
import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const fileCreation =  () => {
    rl.question('Enter the name of the file you want to create with extension: ',  (fileName) => {
        rl.question('Enter the content of the file: ',  (content) => {
           
            fs.writeFile(`${fileName}.txt`, content, (err) => {
                if (err) {
                    console.error('Error creating file:', err)
                } else {
                    console.log(`File ${fileName} created successfully!`)
                }
                rl.close()
            })
        }  )

 })
}

fileCreation()