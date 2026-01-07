const programs = {
  Starfish: {
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
  },

  "Sea Turtle": {
    "Sea Turtle 1": [
      "Back float (5 sec)",
      "Front float (5 sec)",
      "Roll over float (5 sec)",
      "Back glide (5 sec)",
      "Front glide (5 sec)",
      "Kicking on front (2 m, assisted)",
      "Kicking on back (2 m, assisted)",
      "Jump in pool, swim to wall, climb out (assisted)"
    ],

    "Sea Turtle 2": [
      "Roll over glide (15 m)",
      "Kicking on front with 4 front crawl arms",
      "Kicking on side (5 m, assisted)",
      "Jump in pool, swim to wall, climb out"
    ],

    "Sea Turtle 3": [
      "Kicking on side (10 m)",
      "4 front crawl arms, roll to side, with flutterboard (15 m)",
      "Back crawl with 6 kicks, 1 arm (15 m)",
      "Jump in pool, tread water, climb out (30 sec)"
    ],

    "Sea Turtle 4": [
      "4 front crawl arms, roll to side (25 m)",
      "Back crawl with 3 kicks, 1 arm (25 m)",
      "Treading water (60 sec)"
    ],

    "Sea Turtle 5": [
      "2 front crawl arms, roll to side, with flutterboard (50 m)",
      "Back crawl with continuous arms (50 m)",
      "Treading water (90 sec)"
    ],

    "Sea Turtle 6": [
      "2 front crawl arms, roll to side (50 m)",
      "Back crawl (50 m)",
      "Whip kick on back (25 m)",
      "Treading water (120 sec)"
    ],

    "Sea Turtle 7": [
      "Front crawl with bilateral breathing (75 m)",
      "Back crawl (75 m)",
      "Whip kick on front (25 m)",
      "Eggbeater (30 sec)"
    ],

    "Sea Turtle 8": [
      "Front crawl with bilateral breathing (75 m)",
      "Back crawl with bent arm pull (75 m)",
      "Breaststroke (25 m, assisted)",
      "Eggbeater (60 sec)"
    ],

    "Sea Turtle 9": [
      "Front crawl with bent arms and bilateral breathing (75 m)",
      "Back crawl with bent arm pull (75 m)",
      "Breaststroke (25 m)",
      "Eggbeater (120 sec)",
      "Kneeling dive"
    ],

    "Sea Turtle 10": [
      "Front crawl with bent arms and bilateral breathing (100 m)",
      "Back crawl with bent arm pull (100 m)",
      "Breaststroke (50 m)",
      "Swim 300 m continuously",
      "Eggbeater (120 sec)",
      "Standing dive"
    ]
  },

  Sunfish: {
    "Sunfish 11": [
      "Swim 400 m continuously (13 min)",
      "Head up front crawl (25 m)",
      "Head up breaststroke (25 m)",
      "Whip kick on back (25 m)",
      "Eggbeater kick on back (25 m)",
      "Foot first surface dive, underwater swim (5 m), and surface",
      "Eggbeater (150 sec)",
      "Stride entry with noodle"
    ],

    "Sunfish 12": [
      "Swim 400 m continuously (12 min)",
      "Head up front crawl (50 m)",
      "Head up breaststroke (50 m)",
      "Towing (25 m)",
      "Head first surface dive, underwater swim (5 m), and surface",
      "Eggbeater (180 sec)",
      "Stride entry"
    ]
  }
};

let currentProgram = "Starfish"; // "Sea Turtle" // "Sunfish"

const programData = programs[swimmerProgram];
const levelsContainer = document.getElementById("levels");

function loadProgram() {
  const selected = document.getElementById("programSelect").value;
  currentProgram = selected;

  const programData = programs[currentProgram];
  const levelsContainer = document.getElementById("levels");

  levelsContainer.innerHTML = "";

  Object.keys(programData).forEach(levelName => {
    const levelDiv = document.createElement("div");
    levelDiv.className = "level";

    const title = document.createElement("h2");
    title.innerText = levelName;
    levelDiv.appendChild(title);

    programData[levelName].forEach(skill => {
      const label = document.createElement("label");
      label.className = "skill";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      label.appendChild(checkbox);
      label.append(" " + skill);

      levelDiv.appendChild(label);
    });

    levelsContainer.appendChild(levelDiv);
  });
}

loadProgram();

async function saveDraft() {
  const report = {
    swimmer_name: document.getElementById("swimmerName").value,
    instructor: document.getElementById("instructorName").value,
    program: currentProgram,
    checklist: collectChecklistData(),
    recommended_level: calculateRecommendationValue(),
    status: "draft"
  };

  await supabase
    .from("swim_reports")
    .insert([report]);

  alert("Draft saved. Review before publishing.");
}

async function publishReport() {
  await supabase
    .from("swim_reports")
    .update({ status: "published" })
    .eq("id", reportId);

  alert("Report is now visible to parents.");
}
