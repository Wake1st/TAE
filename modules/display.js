import { setEventIndex } from '../state/eventIndex.js';


const timelineItems = document.querySelector("#timeline-items");
const currentDecision = document.querySelector("#current-decision");
const decisionTitle = document.querySelector("#decision-title");
const choicesContainer = document.querySelector("#choices");
const bgMusic = document.querySelector("#bgMusic");


function createChoiceContainer({ nextId, name, summary, consequences }) {
  const choiceContainer = document.createElement("div");
  choiceContainer.classList.add("choice-container");

  choiceContainer.addEventListener("click", () => {
    setEventIndex(nextId);

    //  some decisions just reset the story
    if (consequences) {
      const newFlock = { ...flock };
      consequences.forEach(({ key, value }) => {
        newFlock[key] += value;
      });
      setFlock(newFlock)
    }

    //  hide decision box
    currentDecision.classList.remove("fade-in-up");
    currentDecision.classList.add("fade-out-down");

    //  wipe internals
    choicesContainer.innerHTML = null;
  });

  const titleEl = document.createElement("h4");
  titleEl.classList.add("choice-title");
  titleEl.innerHTML = name;
  choiceContainer.appendChild(titleEl);

  //  not everything needs to be summed up
  if (summary) {
    const summaryEl = document.createElement("p");
    summaryEl.classList.add("choice-summary");
    summaryEl.innerHTML = summary;
    choiceContainer.appendChild(summaryEl);
  }

  return choiceContainer;
}

function displayDecisions(text, choices) {
  //  show decision box
  currentDecision.classList.remove("hidden");
  currentDecision.classList.remove("fade-out-down");
  currentDecision.classList.add("fade-in-up");

  //  insert decision
  decisionTitle.innerHTML = text;

  //  insert choices
  choicesContainer.innerHTML = null;
  choices.forEach((choice) => {
    const con = createChoiceContainer(choice);
    choicesContainer.appendChild(con);
  });
}

function displayTimelineItem(text, element, classes) {
  const el = document.createElement(element);
  el.innerHTML = text;
  el.classList.add("timeline-item", ...classes);
  timelineItems.appendChild(el);
}

function displayReset(text) {
  const choices = [
    {
      nextId: 0,
      name: "Game Over",
      summary: "Restart",
    },
  ];

  displayDecisions(text, choices);
}

export {
  timelineItems,
  currentDecision,
  decisionTitle,
  choicesContainer,
  bgMusic,
  displayDecisions,
  displayTimelineItem,
  displayReset,
};