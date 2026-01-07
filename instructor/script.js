let currentProgram = "Starfish";
let finalized = false;

function loadProgram() {
  const program = programs[currentProgram];
  const container = document.getElementById("levels");
  container.innerHTML = "";

  Object.entries(program).forEach(([level, skills]) => {
    const levelDiv = document.createElement("div");
    levelDiv.className = "level-grid";

    const levelTitle = document.createElement("h2");
    levelTitle.innerText = level;

    const skillsDiv = document.createElement("div");
    skillsDiv.className = "skills";

    skills.forEach(skill => {
      const label = document.createElement("label");
      label.className = "skill";

      const cb = document.createElement("input");
      cb.type = "checkbox";

      label.appendChild(cb);
      label.append(" " + skill);
      skillsDiv.appendChild(label);
    });

    levelDiv.appendChild(levelTitle);
    levelDiv.appendChild(skillsDiv);
    container.appendChild(levelDiv);
  });
}

loadProgram();

function finalizeReport() {
  const recommendation = document.getElementById("manualRecommendation").value;

  if (!recommendation) {
    alert("Please enter the level to register in.");
    return;
  }

  document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.disabled = true);

  localStorage.setItem("shoreSwimFinalReport", JSON.stringify({
    finalized: true,
    published: false,
    recommendation: recommendation
  }));

  finalized = true;
  alert("Report finalized. Ready to publish.");
}

function publishReport() {
  if (!finalized) {
    alert("Please finalize the report first.");
    return;
  }

  const report = JSON.parse(localStorage.getItem("shoreSwimFinalReport"));
  report.published = true;
  localStorage.setItem("shoreSwimFinalReport", JSON.stringify(report));

  alert("Report published. Parents can now view it.");
}
