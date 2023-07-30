import path from 'path';


let audio = {};

function loadAudio(data, directory='/assets/audio') {
  const audioData = data.map(({ id, file }) => ({
    [id]: new Audio(path.join(__dirname, directory, file)),
  }));
  console.log("audio data: ", audioData);

  audio = {...audio, ...audioData};
}

function playAudio(audioName) {
  audio[audioName].play();
}

export {
  loadAudio,
  playAudio,
};
