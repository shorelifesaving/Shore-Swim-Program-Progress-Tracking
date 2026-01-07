const finalReport = JSON.parse(
  localStorage.getItem("shoreSwimFinalReport")
);
const READ_ONLY = true; 

const programData = {
  "Starfish 1": [
    "Back float (5 sec, assisted)",
    "Front float (5 sec, assisted)",
    "Roll over float (5 sec, assisted)",
    "Back glide (5 sec, assisted)",
    "Front glide (5 sec, assisted)"
  ],

  "Starfish 2": [
    "Back float (5 sec)",
    "Front float (5 sec)",
    "Roll over float (5 sec, assisted)",
    "Back glide (5 sec, assisted)",
    "Front glide (5 sec, assisted)",
    "Kicking on front (2 m, assisted)",
    "Kicking on back (2 m, assisted)",
    "Jump in pool, swim to wall, climb out (assisted)"
  ],

  "Starfish 3": [
    "Roll over float (5 sec)",
    "Back glide (5 sec)",
    "Front glide (5 sec)",
    "Kicking on front (2 m, assisted)",
    "Kicking on back (2 m, assisted)",
    "Roll over glide (10 m, assisted)",
    "Jump in pool, swim to wall, climb out (assisted)"
  ],

  "Starfish 4": [
    "Kicking on front (2 m)",
    "Kicking on back (2 m)",
    "Roll over glide (15 m)",
    "Jump in pool, swim to wall, climb out"
  ],

  "Starfish 5": [
    "Roll over glide (15 m)",
    "Kicking on front with 4 front crawl arms",
    "Kicking on side (5 m, assisted)",
    "Jump in pool, tread water, climb out (15 sec, assisted)"
  ],

  "Starfish 6": [
    "Kicking on side (5 m)",
    "4 front crawl arms, roll to side, with flutterboard (10 m, assisted)",
    "Back crawl with 6 kicks, 1 arm (10 m, assisted)",
    "Jump in pool, tread water, climb out (15 sec)"
  ],

  "Starfish 7": [
    "Kicking on side (10 m)",
    "4 front crawl arms, roll to side, with flutterboard (15 m)",
    "Back crawl with 6 kicks, 1 arm (15 m)",
    "Jump in pool, tread water, climb out (30 sec)"
  ]
};

if (!finalReport || !finalReport.finalized) {
  document.body.innerHTML = `
    <h1>Progress Report</h1>
    <p>This report is not yet available.</p>
  `;
  throw new Error("Report not finalized");
}
const levelsContainer = document.getElementById("levels");
levelsContainer.innerHTML = "";

Object.entries(programData).forEach(([levelName, skills]) => {
  const levelDiv = document.createElement("div");
  levelDiv.className = "level";

  const title = document.createElement("h2");
  title.textContent = levelName;
  levelDiv.appendChild(title);

  skills.forEach(skillText => {
    const label = document.createElement("label");
    label.className = "skill";
    label.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.disabled = READ_ONLY; 

    label.appendChild(checkbox);
    label.append(" " + skillText);
    levelDiv.appendChild(label);
  });

  levelsContainer.appendChild(levelDiv);
});

function saveProgress() {
  alert("Parent view — saving disabled");
}

// RUN ON LOAD
calculateRecommendation();


document.getElementById("recommendation").innerText =
  "Level to register in: " + finalReport.recommendation;
