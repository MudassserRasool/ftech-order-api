
// const express = require('express');
// const mongoose = require('mongoose');
// const orderRoutes = require('./routes/order');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// mongoose.connect('mongodb://mern2022:mern2022@ac-1vocr4t-shard-00-00.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-01.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-02.43aaypx.mongodb.net:27017/?ssl=true&replicaSet=atlas-x4e2nh-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', (error) => console.error('MongoDB connection error:', error));
// db.once('open', () => console.log('Connected to MongoDB'));

// app.use('/api', orderRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = process.env.PORT || 3001;

// // Connect to your MongoDB database
// mongoose.connect('mongodb://mern2022:mern2022@ac-1vocr4t-shard-00-00.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-01.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-02.43aaypx.mongodb.net:27017/?ssl=true&replicaSet=atlas-x4e2nh-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(express.json());

// // Define your order schema and model here

// app.get('/api/orders', (req, res) => {
//   // Retrieve orders from your database and send as JSON response
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Connect to your MongoDB database
mongoose.connect('mongodb://mern2022:mern2022@ac-1vocr4t-shard-00-00.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-01.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-02.43aaypx.mongodb.net:27017/?ssl=true&replicaSet=atlas-x4e2nh-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure CORS to allow requests from your frontend origin
app.use(cors());

// Create a schema and model for the order data
const orderSchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number, price: Number }],
  orderDate: Date,
});

const Order = mongoose.model('Order', orderSchema);

// Define API routes
app.get('/api/orders', async (req, res) => {
  try {
    // Fetch orders from the database
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
