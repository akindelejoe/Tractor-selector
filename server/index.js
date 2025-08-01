const express = require ("express");
const cors = require ("cors");
const { log } = require("node:console");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("client"))


const TRACTOR_MODELS = {
    E3250: "A workhorse for a small farm or a big backyard. Medium- to heavy-duty year-round tractor.",
    E2600: "Perfect for a small farm or big backyard. Light- to medium-duty for most chores.",
    W1205: "Ideal for large farm general tasks. Medium- to heavy-duty strength.",
    W2500: "Heavy-duty model built for wheat, corn, and soy farms. Year-round reliability.",
    W2550: "Heavy-duty general use tractor. Reliable in all conditions."
  };

  const FUEL_COSTS = {
    E85: 1.8,
    biodiesel: 2.2,
    diesel: 2.5
  };
 

  app.post("/api/recommend", (req, res) => {
    const { acres, months, crops, fuel } = req.body;
  
    if (!acres || !months || !fuel || !Array.isArray(crops) || crops.length === 0) {
      return res.status(400).json({ message: "Missing or invalid input fields." });
    }
  
    let model = "";
  
    if (acres <= 5000) {
      model = months > 10 ? "E2600" : "E3250";
    } else {
      if (months <= 9) {
        model = "W1205";
      } else {
        model = (crops.includes("wheat") || crops.includes("corn") || crops.includes("soy")) ? "W2500" : "W2550";
      }
    }

    const costRate = FUEL_COSTS[fuel] || 2.0;
    const estimatedFuelCost = (acres * months * costRate * 0.1).toFixed(2);
  
    res.json({
      model: model + fuel[0].toUpperCase(), 
      description: TRACTOR_MODELS[model],
      estimatedFuelCost
    });
  });

  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });

  