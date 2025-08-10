const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//  Enable CORS
app.use(cors());

// Body parser for JSON
app.use(express.json());

// Serve frontend files (adjust path if needed)
app.use(express.static(path.join(__dirname, "client")));

//  POST endpoint
app.post("/api/recommend", (req, res) => {
  const { acres, months, crops, fuel } = req.body;

  if (!acres || !months || !crops || !fuel) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let model = "Standard Model 1000";
  let description = "Suitable for general farming needs";
  let estimatedFuelCost = months * 200;

  if (acres > 200) {
    model = "Heavy Duty Model X";
    description = "Best for large farms with high workload.";
    estimatedFuelCost = months * 500;
  }

  res.json({ model, description, estimatedFuelCost });
});

//  Fallback route for SPA (avoids interfering with API routes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚜 Server running on http://localhost:${PORT}`);
});
