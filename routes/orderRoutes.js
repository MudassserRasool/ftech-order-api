// const express = require('express');
// const router = express.Router();
// const Order = require('../models/order'); // Import your order model

import express from 'express';
import Order from '../models/order.js';

const router = express.Router();
// DELETE route for order deletion
router.delete('/api/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Implement logic to delete the order from the database
    await Order.findOneAndDelete({ _id: orderId });

    res.status(204).send({ message: 'delete scuessfully' }); // Respond with a 204 No Content status for success
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
