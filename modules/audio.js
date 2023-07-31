const bgMusic = document.querySelector("#bgMusic");


let audio = {};

function loadAudio(data) {
  for (const [key,value] of Object.entries(data)) {
    audio = {
      ...audio,
      [key]: new Audio(
        `../assets/audio/${value}`
      ),
    }
  }
}

function playAudio(key) {
  audio[key].play();
}

export {
  bgMusic,
  loadAudio,
  playAudio,
};
