const path = require('path')
const fs = require('fs')

// console.log(process.argv);        // see path location of file


const inputArguments = process.argv.slice(2)

const text = inputArguments.join(' ')

const message = `${text} \n`

if(!message){
    console.log('Please provide a message to log');
    console.log('Example: node index.js hello world i am learning node js');
    process.exit(1)
}

const filePath = path.join(__dirname, 'log.txt')

fs.appendFile(filePath, message, {encoding: 'utf8'}, () =>{
    console.log('Your log added successfully');
})



console.log(filePath);