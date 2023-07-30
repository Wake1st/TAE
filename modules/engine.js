import processes from './event.js';
import { 
  timelineItems,
  choicesContainer,
} from './display.js';

import { eventIndex, setEventIndex } from '../state/eventIndex.js';


function start(events) {
  function loop() {
    if (eventIndex === 0) {
      timelineItems.innerHTML = null;
      choicesContainer.innerHTML = null;
    }
    
    let event = events.find(({ id }) => id === eventIndex);
    
    if (!event) {
      event = events.find(({ id }) => id === -1);
    }
    
    const { nextId, type } = event;
    
    const process = processes[type];
    process(event);
    
    //  sometimes we skip to another section
    if (nextId) {
      setEventIndex(nextId);
    }

    //  auto-scroll
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(window.scrollTo, 2000, 0, document.body.scrollHeight);
  }

  addEventListener("keydown", loop);
  addEventListener("click", loop);
}

export default start;
