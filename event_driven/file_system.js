
// sync
const fs = require('fs');

// const text = 'Learning File System';

// fs.writeFileSync('./hello.txt', text)

// const data = fs.readFileSync("./hello.txt", { encoding: 'utf-8', flag: 'r' });

// console.log(data);


//async

const text = 'new hello world'

fs.writeFile('./hello.txt', text, 'utf8', (err) =>{
    if(err){
        console.log('Error Writing File', err);
        return;
    }
    console.log('Writing File Successfully');
})

fs.readFile('./hello.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});


