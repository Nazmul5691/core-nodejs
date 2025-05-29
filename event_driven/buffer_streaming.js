const { error } = require('console');
const fs = require('fs');

const text = 'new hello world'

// fs.readFile('./hello.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }

//     fs.writeFile('./hello_world.txt', data, 'utf8', (err) => {
//         if (err) {
//             console.log('Error Writing File', err);
//             return;
//         }
//         console.log('Writing File Successfully');
//     })
// });


const readStream = fs.createReadStream('./hello.txt', {encoding: 'utf-8'})
const writeStream = fs.createWriteStream('./hello_world.txt', {encoding: 'utf-8'})

readStream.on('data', (data) =>{
    console.log(data);

    writeStream.write(data, (err) =>{
        if(err){
            throw error('error', err)
        }
    })
})


// get error
readStream.on('error', (err) =>{
    if(err){
            throw error('error', err)
        }
})

writeStream.on('error', (err) =>{
    if(err){
        throw error('error', err)
    }
})


readStream.on('end', () =>{
    console.log('reading ended');
    writeStream.end();
})

writeStream.on('finish', () =>{
    console.log('writing success');
})



