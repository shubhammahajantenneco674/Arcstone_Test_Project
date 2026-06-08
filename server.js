const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api/dashboard-summary", async (req, res) => {
  try {
    const response = await fetch(
      "http://10.131.24.96/arc.flow.STANDARD/workflows/custom/demand-dashboard-overview"
    );

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch data from external API"
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching dashboard summary:", error.message);
    res.status(500).json({
      message: "Unable to fetch dashboard summary"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


