const API_URL = "http://10.131.24.96/arc.flow.STANDARD/workflows/custom/demand-dashboard-overview/api/summary";

const summaryElements = {
  total: document.getElementById("totalCount"),
  newCount: document.getElementById("newCount"),
  inProgressCount: document.getElementById("inProgressCount"),
  approvedCount: document.getElementById("approvedCount"),
  completedCount: document.getElementById("completedCount")
};

const roleElement = document.getElementById("roleCount");
const refreshButton = document.getElementById("refreshBtn");

async function loadSummary() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    summaryElements.total.textContent = data.Total || 0;
    summaryElements.newCount.textContent = data.New || 0;
    summaryElements.inProgressCount.textContent = data["In Progress"] || 0;
    summaryElements.approvedCount.textContent = data.Approved || 0;
    summaryElements.completedCount.textContent = data.Completed || 0;

    roleElement.textContent = data.role || "N/A";

  } catch (error) {
    console.error(error);
    alert("Error loading dashboard data");
  }
}

refreshButton.addEventListener("click", loadSummary);
loadSummary();
