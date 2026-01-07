let currentProgram = "Starfish";

function loadProgram() {
  const container = document.getElementById("levels");
  container.innerHTML = "";

  const program = programs[currentProgram];

  Object.entries(program).forEach(([level, skills]) => {
    const levelDiv = document.createElement("div");
    levelDiv.className = "level";

    const h2 = document.createElement("h2");
    h2.innerText = level;
    levelDiv.appendChild(h2);

    skills.forEach((skill, i) => {
      const label = document.createElement("label");
      label.className = "skill";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.level = level;
      cb.dataset.index = i;

      label.appendChild(cb);
      label.append(" " + skill);
      levelDiv.appendChild(label);
    });

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
