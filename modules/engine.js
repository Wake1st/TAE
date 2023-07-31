import { 
  timelineItems,
  choicesContainer,
  displayElement,
  displayDecisions,
} from './display.js';

import { eventIndex, setEventIndex } from '../state/eventIndex.js';

let eventKeys;

function start(events) {
  eventKeys = events.keys();

  function loop() {
    if (eventIndex === 0) {
      timelineItems.innerHTML = null;
      choicesContainer.innerHTML = null;
    }
    
    //  get the event
    let key = eventKeys.find(({ id }) => id === eventIndex);
    if (!key) {
      console.error(
        `invalid data: cannot find key {${eventIndex}}`
      );
    }

    let { text, next, choices } = events[key]
    
    //  always text to display and audio to play
    playAudio(key)
    displayElement(text, 'p', [
      "timeline-item",
      "naration", 
      "fade-in-down"
    ]);
  
    //  redirect if faulty
    if (!next && !choices ) {
      choices = [{
        text: "Game Over",
        next: "intro",
      }];
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

  addEventListener("keydown", loop);
  addEventListener("click", loop);
}

export default start;
