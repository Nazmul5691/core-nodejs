const path = require('path')

// console.log(process.argv);        // see path location of file


const inputArguments = process.argv.slice(2)

const text = inputArguments.join(' ')

if(!text){
    console.log('Please provide a message to log');
    console.log('Example: node index.js hello world i am learning node js');
    process.exit(1)
}

const filePath = path.join(__dirname, 'log.txt')



console.log(filePath);