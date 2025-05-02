// Import 'fs/promises' for async file operations
import fs from 'fs/promises'
// Import 'readline' for reading user input from the command line
import readline from 'readline'

// File path where todos will be stored
const FILE_PATH = './todos.json'

// Array to hold todo tasks in memory
let todos = []

// 🔄 Load existing tasks from the file if it exists
const loadTodos = async () => {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8') // Read file content
        todos = JSON.parse(data || '[]') // Parse as JSON or default to empty array
    } catch (err) {
        todos = [] // If file doesn't exist or error occurs, start with empty list
    }
}

// 💾 Save the current todos to the file
const saveTodos = async () => {
    try {
        await fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 2)) // Pretty JSON
    } catch (err) {
        console.error('Error saving todos:', err)
    }
}

// Setup readline interface for user input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// 📥 Promisified version of rl.question for use with async/await
const ask = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve)
    })
}

// 🧭 Show menu options to the user
const showMenu = async () => {
    console.log('\n1. Add a Task')
    console.log('2. View Tasks')
    console.log('3. Delete a Task')
    console.log('4. Exit')

    const option = await ask('Choose an option: ') // Wait for user's choice
    await handleInput(option) // Handle user input
}

// 🔁 Handle the user's selected menu option
const handleInput = async (option) => {
    switch (option) {
        case '1': { // Add a task
            const task = await ask('Enter the task: ')
            todos.push(task) // Add to in-memory list
            await saveTodos() // Save to file
            console.log(`Task "${task}" added.`)
            break
        }

        case '2': { // View all tasks
            if (todos.length === 0) {
                console.log('No tasks available.')
            } else {
                console.log('Tasks:')
                todos.forEach((task, index) => {
                    console.log(`${index + 1}. ${task}`) // Show task with index
                })
            }
            break
        }

        case '3': { // Delete a task by number
            const taskNumber = await ask('Enter the task number to delete: ')
            const index = parseInt(taskNumber) - 1 // Convert to zero-based index
            if (index >= 0 && index < todos.length) {
                const deleted = todos.splice(index, 1) // Remove from array
                await saveTodos() // Save updated list to file
                console.log(`Task "${deleted[0]}" deleted.`)
            } else {
                console.log('Invalid task number.') // Invalid input
            }
            break
        }

        case '4': // Exit the application
            console.log('Goodbye!')
            rl.close() // Close readline interface
            return // Exit function without showing menu again

        default: // Invalid input
            console.log('Invalid option. Please try again.')
            break
    }

    // After handling input, show the menu again
    await showMenu()
}

// 🚀 Start the app: load data from file and show menu
const startApp = async () => {
    await loadTodos() // Load from file on start
    await showMenu()  // Show menu options
}

// Initialize the application
startApp()
