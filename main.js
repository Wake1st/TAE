import start from './modules/engine.js';
import { bgMusic, loadAudio } from './modules/audio.js';

async function loadFile(file) {
  return fetch(`./data/${file}`)
    .then((response) => response.json());
}

//  load data
const events = await loadFile("events.json");
const audio = await loadFile("audio.json");

//  setup audio
loadAudio(audio);
bgMusic.volume = 0.4;

//  start the game loop
start(events);
