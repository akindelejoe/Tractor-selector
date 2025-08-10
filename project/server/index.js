const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the sibling client at a fixed prefix
app.use("/static", express.static(path.join(__dirname, "..", "client")));

app.post("/api/recommend", (req, res) => {
  const { acres, months, crops, fuel } = req.body;
  if (acres == null || months == null || !crops || !fuel) {
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

// Serve HTML
app.get("/", (_req, res) =>
  res.sendFile(path.join(__dirname, "..", "client", "index.html"))
);

app.listen(PORT, () => console.log(`Server on ${PORT}`));
