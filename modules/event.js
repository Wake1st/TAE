import {
  displayTimelineItem,
  displayDecision,
  displayReset,
} from './display.js';
import {
  playBoom,
  playWispers,
  playChanting,
  playGong,
} from './audio.js';

import { setEventIndex } from '../state/eventIndex.js';


const processes = {
  "chapter": ({ text, eventIndex }) => {
    displayTimelineItem(text, "h3", ["chapter", "fade-in-left"]);
    playBoom();
    setEventIndex(eventIndex + 1);
  },
  "naration": ({ text, eventIndex }) => {
    displayTimelineItem(text, "p", ["naration", "fade-in-down"]);
    playWispers();
    setEventIndex(eventIndex + 1);
  },
  "scripture": ({ text, soundId, eventIndex }) => {
    displayTimelineItem(text, "p", ["scripture", "fade-in"]);
    playChanting(soundId);
    setEventIndex(eventIndex + 1);
  },
  "decision": ({ text, choices }) => {
    displayDecision(text, choices);
    playGong();
  },
  "reset": ({ text }) => {
    displayReset(text);
  },
}

export default processes;
