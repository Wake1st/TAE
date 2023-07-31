import path from 'path';
import start from './modules/engine.js';
import { bgMusic, loadAudio } from './modules/audio.js';

async function loadFile(file) {
  return fetch(path
    .join(__dirname, 'data', file)
    .then((response) => response.json())
  );
}

//  load data
const events = await loadFile("events.json");
let audio = await loadFile("audio.json");

//  setup audio
loadAudio(audio);
bgMusic.volume = 0.4;

//  start the game loop
start(events);
