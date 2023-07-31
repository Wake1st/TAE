import { setEventIndex } from '../state/eventIndex.js';


const timelineItems = document.querySelector("#timeline-items");
const currentDecision = document.querySelector("#current-decision");
const choicesContainer = document.querySelector("#choices");


function displayChoice(text, parent) {
  const summaryEl = document.createElement("p");
  summaryEl.classList.add("choice-summary");
  summaryEl.innerHTML = text;
  parent.appendChild(summaryEl);
}

function createChoiceContainer({ text, next }) {
  const choiceContainer = document.createElement("div");
  choiceContainer.classList.add("choice-container");

  //  check if text is array or string
  if (typeof text === 'string') {
    displayChoice(text, choiceContainer);
  } else {
    text.forEach((t) => displayChoice(t, choiceContainer));
  }

  choiceContainer.addEventListener("click", () => {
    setEventIndex(next);

    //  hide decision box
    currentDecision.classList.remove("fade-in-up");
    currentDecision.classList.add("fade-out-down");

    //  wipe internals
    choicesContainer.innerHTML = null;
  });  

  return choiceContainer;
}

function displayDecisions(choices) {
  //  show decision box
  currentDecision.classList.remove("hidden");
  currentDecision.classList.remove("fade-out-down");
  currentDecision.classList.add("fade-in-up");

  //  insert choices
  choicesContainer.innerHTML = null;
  for (const [key,value] of Object.entries(choices)) {
    const con = createChoiceContainer({
      text: value,
      next: key,
    });
    choicesContainer.appendChild(con);
  }
}

function displayNaration(text) {
  const el = document.createElement('p');
  el.innerHTML = text;
  el.classList.add(
    "timeline-item",
    "naration", 
    "fade-in-down"
  );
  timelineItems.appendChild(el);
}

export {
  timelineItems,
  choicesContainer,
  displayDecisions,
  displayNaration,
};