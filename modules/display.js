import { setEventIndex } from '../state/eventIndex.js';


const timelineItems = document.querySelector("#timeline-items");
const currentDecision = document.querySelector("#current-decision");
const choicesContainer = document.querySelector("#choices");


function createChoiceContainer({ text, next }) {
  const choiceContainer = document.createElement("div");
  choiceContainer.classList.add("choice-container");

  //  TODO: check if text is array or string
  if (typeof text === 'string') {
    const summaryEl = document.createElement("p");
    summaryEl.classList.add("choice-summary");
    summaryEl.innerHTML = text;
    choiceContainer.appendChild(summaryEl);
  } else {
    text.map((t) => {
      const summaryEl = document.createElement("p");
      summaryEl.classList.add("choice-summary");
      summaryEl.innerHTML = t;
      choiceContainer.appendChild(summaryEl);
    })
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
  choices.forEach((choice) => {
    const con = createChoiceContainer(choice);
    choicesContainer.appendChild(con);
  });
}

function displayElement(text, element, classes) {
  const el = document.createElement(element);
  el.innerHTML = text;
  el.classList.add(...classes);
  timelineItems.appendChild(el);
}

function displayReset() {
  const choices = [
    {
      text: "Game Over",
      next: "intro",
    },
  ];

  displayDecisions(choices);
}

export {
  timelineItems,
  choicesContainer,
  bgMusic,
  displayDecisions,
  displayElement,
};