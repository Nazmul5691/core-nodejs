const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {}


const schoolBell  = new SchoolBell();


schoolBell.on('ring', () =>{
    console.log('yeahhh, cls sesh');
})


schoolBell.on('broken', () =>{
    console.log('nooo, aro cls ache');
})

schoolBell.emit('ring')
schoolBell.emit('broken')

