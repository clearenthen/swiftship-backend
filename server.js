require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const shipmentRoutes = require('./routes/shipment');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend (if index.html is in public/)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Health check route
app.get('/ping', (req, res) => {
  res.send('🎯 Backend is alive!');
});

// ✅ API route
app.use('/api/shipments', shipmentRoutes);

// ✅ Debug: log the MongoDB connection string
console.log("MONGODB_URI is:", process.env.MONGODB_URI);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connecté à MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch(err => console.error("Erreur MongoDB:", err));
