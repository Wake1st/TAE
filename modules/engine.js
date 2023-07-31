import { 
  timelineItems,
  choicesContainer,
  displayNaration,
  displayDecisions,
} from './display.js';
import {
  playAudio
} from './audio.js';

import { eventIndex, setEventIndex } from '../state/eventIndex.js';

let eventKeys;

function start(events) {
  eventKeys = Object.keys(events);

  function loop() {
    if (eventIndex === "intro") {
      timelineItems.innerHTML = null;
      choicesContainer.innerHTML = null;
    }
    
    //  get the event
    let key = eventKeys.find((id) => id === eventIndex);
    if (!key) {
      console.error(
        `Invalid Data: cannot find key {${eventIndex}}`
      );
    }

    let { text, next, choices } = events[key]
    
    //  always text to display and audio to play
    playAudio(key)
    if (typeof text === 'string') {
      displayNaration(text);
    } else {
      text.forEach((t) => displayNaration(t));
    }
  
    //  redirect if faulty
    if (!next && !choices ) {
      choices = {
        "intro": "Restart",
      };
    }

    //  display possible choices
    if (choices) {
      displayDecisions(choices)
    } else {
      setEventIndex(next);
    }

    //  auto-scroll
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(window.scrollTo, 2000, 0, document.body.scrollHeight);
  }

  addEventListener("click", loop);
}

export default start;
