// Random Joke Generator
import https from "https";
import chalk from "chalk";




const getJoke = () => { 
const url = "https://official-joke-api.appspot.com/random_joke"

https.get(url, (res) => {
    let data = ''
    res.on("data", (chunk) => {
        data =  data + chunk
    })
    res.on('end', () => {
        const joke = JSON.parse(data)
        console.log(chalk.blue("Here's a random joke for you:"))
        console.log(chalk.bgRed(joke.setup))
        console.log(chalk.bgGreen(joke.punchline))
    })
})
}

getJoke()