import {
  displayTimelineItem,
  displayDecisions,
  displayReset,
} from './display.js';
import { playAudio } from './audio.js';

import { eventIndex, setEventIndex } from '../state/eventIndex.js';


const processes = {
  "naration": ({ text, id }) => {
    displayTimelineItem(text, "p", ["naration", "fade-in-down"]);
    playAudio(id);
    setEventIndex(eventIndex + 1);
  },
  "decision": ({ text, choices }) => {
    displayDecisions(text, choices);
  },
  "selection": ({ text }) => {
    displayTimelineItem(text, "h3", ["selection", "fade-in-left"]);
    setEventIndex(eventIndex + 1);
  },
  "reset": ({ text }) => {
    displayReset(text);
  },
}

export default processes;
