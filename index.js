// Importar express
const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs-extra');
const utils = require('./src/utils')

// Middleware para permitir solicitudes desde el frontend (CORS)
const cors = require('cors');
app.use(cors());

// Middleware para parsear los datos JSON
app.use(express.json());


let playMap = new Map();

const loadPlaylist = () => {
    
    let files = fs.readdirSync('./audio/');

    files.forEach(element => {
       playMap.set(element , { played: 0 , msDuration: 0});
    });
}

loadPlaylist();

// ?GET -----------------------------------------

app.get('/api/song', (req, res) => {  
    setRound();
    const randomsong = getRandomSong();
    
    res.json({title : randomsong[0] , info :  randomsong[1] }); 
});

// ?POST ----------------------------------------

app.put("/api/song", (req, res) => {

    const song = req.song;

    playMap.get(song.path).msDuration = song.msDuration;

})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

let round = 0;
const setRound = () => {
    const isEvenRound = Array.from(playMap.entries()).every(song => song[1].played === round + 1);
    if (isEvenRound) round++; 
}

const getRandomSong = () => {
    let playSubMap = Array.from(playMap.entries()).filter(song =>  song[1].played === round);
    const randomIndex = Math.floor(Math.random() * playSubMap.length);
    const randomEntry = playSubMap[randomIndex];

    playMap.get(randomEntry[0]).played++;


    return randomEntry; 
}