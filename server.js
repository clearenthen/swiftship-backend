require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ THIS IS THE MISSING LINE

const shipmentRoutes = require('./routes/shipment');

const app = express();

// ✅ Serve frontend files from the /public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

// ✅ Backend API route
app.use('/api/shipments', shipmentRoutes);

// 🔍 Debug: log the MONGODB_URI to verify it's loaded
console.log("MONGODB_URI is:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("✅ Connecté à MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Serveur lancé sur le port ${process.env.PORT || 5000}`);
  });
})
.catch(err => console.error("Erreur MongoDB:", err));

