import { lerp } from './math.js';


let wispers = [
  new Audio("../assets/audio/Wispers1.wav"),
  new Audio("../assets/audio/Wispers2.wav"),
  new Audio("../assets/audio/Wispers3.wav"),
];

let boom = new Audio("../assets/audio/Boom.wav");
let gong = new Audio("../assets/audio/Gong.wav");
let ring = new Audio("../assets/audio/Ring.wav");

let chants;


function loadChants(chants) {
  const newChants = chants.map((chant) => ({
    ...chant,
    sound: new Audio(`./assets/audio/chants/${chant.file}`),
  }));
  chants = [...newChants];
}

function playChanting(chantId) {
  const chant = chants.find(({ id }) => id === chantId);

  if (chant) {
    chant.sound.volume = 0.4;
    chant.sound.play();
  } else {
    console.error(`could not find change chant with id: ${chantId}`);
  }
}

function playWispers() {
  function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
  }
  
  wispers.forEach((wisper) => {
    //  randomly play
    if (getRandomInt(2) % 2 === 0) {
      wisper.volume = lerp(0.6, 0.8, Math.random());
      wisper.play();
    }
  });
}

function playBoom() {
  boom.volume = 0.4;
  boom.play();
}

function playGong() {
  gong.play();
}

function playRing() {
  ring.play();
}

export {
  loadChants,
  playChanting,
  playWispers,
  playBoom,
  playGong,
  playRing,
};
