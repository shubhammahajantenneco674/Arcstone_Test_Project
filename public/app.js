const API_URL = "/api/dashboard-summary";

const summaryElements = {
  total: document.getElementById("totalCount"),
  newCount: document.getElementById("newCount"),
  inProgressCount: document.getElementById("inProgressCount"),
  approvedCount: document.getElementById("approvedCount"),
  completedCount: document.getElementById("completedCount"),
  highPriorityCount: document.getElementById("highPriorityCount")
};

const roleElement = document.getElementById("roleCount");
const refreshButton = document.getElementById("refreshBtn");

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorMessage = "Request failed";
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // Ignore JSON parse error
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}

async function loadSummary() {
  try {
    const summary = await fetchJson(API_URL);

    summaryElements.total.textContent = summary.Total || 0;
    summaryElements.newCount.textContent = summary.New || 0;
    summaryElements.inProgressCount.textContent = summary["In Progress"] || 0;
    summaryElements.approvedCount.textContent = summary.Approved || 0;
    summaryElements.completedCount.textContent = summary.Completed || 0;

    if (summaryElements.highPriorityCount) {
      summaryElements.highPriorityCount.textContent = 0;
    }

    if (roleElement) {
      roleElement.textContent = summary.role || "N/A";
    }
  } catch (error) {
    console.error("Error loading summary:", error);
    alert(`Unable to load dashboard data: ${error.message}`);
  }
}

if (refreshButton) {
  refreshButton.addEventListener("click", loadSummary);
}

loadSummary();