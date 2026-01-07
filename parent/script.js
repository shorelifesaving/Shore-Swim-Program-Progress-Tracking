const finalReport = JSON.parse(localStorage.getItem("shoreSwimFinalReport"));

if (!finalReport || !finalReport.published) {
  document.body.innerHTML = `
    <h1>Progress Report</h1>
    <p>This report is not yet available.</p>
  `;
  throw new Error("Not published");
}

document.getElementById("recommendation").innerText =
  "Level to register in: " + finalReport.recommendation;
