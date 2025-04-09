const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: String,
  sender: String,
  recipient: String,
  status: String,
  origin: String,
  destination: String,
  weight: Number,
  bn: String
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);
