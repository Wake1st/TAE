import path from 'path';


const bgMusic = document.querySelector("#bgMusic");


let audio = {};

function loadAudio(data) {
  //  TODO: rethink keys and values
  const audioData = data.map(({ id, file }) => ({
    [id]: new Audio(
      path.join(__dirname, 'assets/audio', file)
    ),
  }));
  console.log("audio data: ", audioData);

  audio = {...audio, ...audioData};
}

function playAudio(audioName) {
  audio[audioName].play();
}

export {
  bgMusic,
  loadAudio,
  playAudio,
};
