let eventIndex = 0;

let flock = {
  faith: 5,
  resolve: 5,
  contentment: 5,
};

let wispers = [
  new Audio("./assets/audio/Wispers1.wav"),
  new Audio("./assets/audio/Wispers2.wav"),
  new Audio("./assets/audio/Wispers3.wav"),
];

let chants;

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

    //  hide decision box
    currentDecision.classList.remove("fade-in-up");
    currentDecision.classList.add("fade-out-down");

    //  wipe internals
    choicesContainer.innerHTML = null;
    // currentDecision.classList.add("hidden");
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

//  Sound Effects
function playWispers() {
  function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
  }

  wispers.forEach((wisper) => {
    //  randomly play
    if (getRandomInt(2) % 2 === 0) {
      wisper.volume = Math.random();
      wisper.play();
    }
  });
}

function playBoom() {}

function playChanting(chantId) {
  const chant = chants.find(({ id }) => id === chantId);

  if (chant) {
    chant.sound.play();
  } else {
    console.error(`could not find change chant with id: ${chantId}`);
  }
}

//  Begin Game
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

    const { type, nextId, text, choices, soundId } = event;

    switch (type) {
      case "chapter":
        displayTimelineItem(text, "h3", ["chapter", "fade-in-left"]);
        playBoom();
        eventIndex++;
        break;
      case "naration":
        displayTimelineItem(text, "p", ["naration", "fade-in-down"]);
        playWispers();
        eventIndex++;
        break;
      case "scripture":
        displayTimelineItem(text, "p", ["scripture", "fade-in"]);
        playChanting(soundId);
        eventIndex++;
        break;
      case "decision":
        displayDecision(text, choices);
        break;
      case "reset":
        displayReset(text);
        break;
      default:
        console.error(`Cannot read type: ${type}`);
        break;
    }

    //  sometimes we skip to another section
    if (nextId) {
      eventIndex = nextId;
    }

    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(window.scrollTo, 2000, 0, document.body.scrollHeight);
  }

  addEventListener("keydown", loop);
  addEventListener("click", loop);
}

(async function () {
  async function readJson(path) {
    return fetch(path).then((response) => response.json());
  }

  const events = await readJson("./data/events.json");
  chants = await readJson("./data/chants.json");

  loadSoundFiles();

  //  start the game loop
  start(events);
})();

function makeDecision(id) {
  eventIndex = id;
}

function loadSoundFiles() {
  const newChants = chants.map((chant) => ({
    ...chant,
    sound: new Audio(`./assets/audio/chants/${chant.file}`),
  }));
  chants = [...newChants];
}
