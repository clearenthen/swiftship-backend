const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');
const nodemailer = require('nodemailer');

// Create a shipment
router.post('/', async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    const saved = await shipment.save();

    // ✅ EMAIL NOTIFICATION
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'expresslogistics@gmail.com',     // replace with your Gmail
        pass: 'qwezxc123abc456def'         // use Gmail App Password here
      }
    });

    const mailOptions = {
      from: 'SwiftShip <your_email@gmail.com>',
      to: 'recipient@example.com',   // test with your Gmail
      subject: `📦 Shipment Created - #${saved.trackingNumber}`,
      text: `
        A new shipment has been created!

        From: ${saved.sender}
        To: ${saved.recipient}
        Status: ${saved.status}
        Tracking #: ${saved.trackingNumber}
        Origin: ${saved.origin}
        Destination: ${saved.destination}
        Weight: ${saved.weight}kg
        B.N: ${saved.bn}
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email error:', error);
      } else {
        console.log('✅ Email sent:', info.response);
      }
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save shipment', error: err });
  }
});

// Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch shipments', error: err });
  }
});

// Get shipment by tracking number
router.get('/:trackingNumber', async (req, res) => {
  try {
    const result = await Shipment.findOne({ trackingNumber: req.params.trackingNumber });
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Shipment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to search shipment', error: err });
  }
});

module.exports = router;
