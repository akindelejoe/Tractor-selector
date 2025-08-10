/*    JavaScript 7th Edition
      Chapter 4
      Chapter case

      Tuba Farm Equipment
      Variables and functions
      Author: Joseph Akindele




/* global variables tracking status of each form section */

document.addEventListener("DOMContentLoaded", () => {
   const form = document.getElementById("tractorForm");
   const messageHead = document.getElementById("messageHead");
   const messageBody = document.getElementById("message");
 
   form.addEventListener("submit", async (e) => {
     e.preventDefault();
 
     // Extract form values
     const acres = parseInt(document.getElementById("acres").value);
     const months = parseInt(document.getElementById("months").value);
     const crops = Array.from(document.querySelectorAll(".checkbox-group input[type='checkbox']:checked"))
       .map(cb => cb.value);
     const fuel = document.querySelector(".radio-group input[type='radio']:checked")?.value;
 
     // Validate required fields
     if (isNaN(acres) || isNaN(months) || crops.length === 0 || !fuel) {
       messageHead.textContent = "Incomplete Form";
       messageBody.textContent = "Please complete all fields before submitting.";
       return;
     }
 
     // Prepare payload for backend
     const payload = { acres, months, crops, fuel };
 
     try {
       // Send POST request to backend API endpoint
       const res = await fetch("https://tractor-selector-5.onrender.com/api/recommend", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload)
       });
 
       const data = await res.json();
 
       if (res.ok) {
         messageHead.textContent = data.model;
         messageBody.textContent = data.description + (data.estimatedFuelCost ? `\nEstimated Annual Fuel Cost: $${data.estimatedFuelCost}` : "");
       } else {
         messageHead.textContent = "Error";
         messageBody.textContent = data.message || "An unknown error occurred.";
       }
     } catch (error) {
       messageHead.textContent = "Connection Error";
       messageBody.textContent = "Unable to reach backend server.";
     }
   });
 });
 