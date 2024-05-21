const express = require('express');
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, './client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    
})

app.listen(8000, () => {
    console.log('Server runs on port 8000');
});

const messages = [

];

