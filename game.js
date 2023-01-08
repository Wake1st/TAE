let eventIndex = 0;

let flock = {
  faith: 5,
  resolve: 5,
  contentment: 5,
};

const timelineItems = document.querySelector("#timeline-items");
const currentDecision = document.querySelector("#current-decision");
const decisionTitle = document.querySelector("#decision-title");
const choicesContainer = document.querySelector("#choices");

function createChoiceContainer({ nextId, name, summary, consequences }) {
  const choiceContainer = document.createElement("div");
  choiceContainer.classList.add("choice-container");

  choiceContainer.addEventListener("click", () => {
    makeDecision(nextId);

    //  some decisions just reset the story
    if (consequences) {
      const oldFlock = { ...flock };
      consequences.forEach(({ key, value }) => {
        oldFlock[key] += value;
      });
      flock = { ...flock, ...oldFlock };
    }

    currentDecision.classList.add("hidden");
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
      name: "Serve Again...",
      summary: "and let the harvest be plentiful.",
    },
  ];

  displayDecision(text, choices);
}

function displayDecision(text, choices) {
  //  show the decision
  currentDecision.classList.remove("hidden");

  //  insert decision
  decisionTitle.innerHTML = text;

  //  insert choices
  choicesContainer.innerHTML = null;
  choices.forEach((choice) => {
    const con = createChoiceContainer(choice);
    choicesContainer.appendChild(con);
  });
}

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

    const { type, nextId, text, choices } = event;

    switch (type) {
      case "chapter":
        displayTimelineItem(text, "h3", ["chapter"]);
        eventIndex++;
        break;
      case "naration":
        displayTimelineItem(text, "p", ["naration"]);
        eventIndex++;
        break;
      case "scripture":
        displayTimelineItem(text, "p", ["scripture"]);
        eventIndex++;
        break;
      case "decision":
        displayDecision(text, choices);
        break;
      case "reset":
        displayReset(text);
        break;
      default:
        console.log(`Cannot read type: ${type}`);
        break;
    }

    //  sometimes we skip to another section
    if (nextId) {
      eventIndex = nextId;
    }

    window.scrollTo(0, document.body.scrollHeight);
  }

  addEventListener("keydown", loop);
  addEventListener("click", loop);
}

(async function () {
  async function readJson(path) {
    return fetch(path).then((response) => response.json());
  }

  const events = await readJson("./data/events.json");

  //  start the game loop
  start(events);
})();

function makeDecision(id) {
  eventIndex = id;
}
