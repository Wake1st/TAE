import start from './modules/engine.js';
import { bgMusic } from './modules/display.js';
import { loadChants } from './modules/audio.js';


async function readJson(path) {
  return fetch(path).then((response) => response.json());
}

//  load data
const events = await readJson("./data/events.json");
let chants = await readJson("./data/chants.json");

//  setup audio
loadChants(chants);
bgMusic.volume = 0.0;

//  start the game loop
start(events);
