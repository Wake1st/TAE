const timelineItemContainer = document.querySelector("#timeline-items");
const currentChoiceContainer = {
  title: document.querySelector("#current-setup > h3"),
  description: document.querySelector("#current-description"),
  decision: document.querySelector("#current-decision > h3"),
  choices: document.querySelector("#choices"),
};

function createChoiceContainer(titleText, summaryText) {
  const choiceContainer = document.createElement("div");
  const title = document.createElement("h4");
  const summary = document.createElement("p");

  choiceContainer.className = "choice-container";
  title.innerHTML = titleText;
  summary.innerHTML = summaryText;

  choiceContainer.appendChild(title);
  choiceContainer.appendChild(summary);

  return choiceContainer;
}

function loadChoice(choice) {
  console.log(choice);
  console.log(currentChoiceContainer);

  //  insert current title
  currentChoiceContainer.title.innerHTML = choice.title;

  //  insert current description
  currentChoiceContainer.description.innerHTML = null;
  choice.setup.forEach((text) => {
    const p = document.createElement("p");
    p.innerHTML = text;
    currentChoiceContainer.description.appendChild(p);
  });

  //  insert decision
  currentChoiceContainer.decision.innerHTML = choice.decision;

  //  insert choices
  currentChoiceContainer.choices.innerHTML = null;
  choice.choices.forEach(({ name, summary }) => {
    const con = createChoiceContainer(name, summary);
    currentChoiceContainer.choices.appendChild(con);
  });
}

(async function () {
  async function readJson(path) {
    return fetch(path).then((response) => response.json());
  }

  const choices = await readJson("./data/choices.json");

  //  start the narative
  loadChoice(choices[0]);
})();
