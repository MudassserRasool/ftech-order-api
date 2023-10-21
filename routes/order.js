// const express = require('express');
// const Order = require('../models/order');

// const router = express.Router();

// // Create a new order
// router.post('/orders', async (req, res) => {
//   try {
//     const { items, totalPrice } = req.body;
//     const order = new Order({ items, totalPrice });
//     const savedOrder = await order.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;
