

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Import the http module
const socketIo = require('socket.io'); // Import socket.io

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach socket.io to the server
const port = process.env.PORT || 3000;

// Connect to your MongoDB database
mongoose.connect(
  'mongodb://mern2022:mern2022@ac-1vocr4t-shard-00-00.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-01.43aaypx.mongodb.net:27017,ac-1vocr4t-shard-00-02.43aaypx.mongodb.net:27017/?ssl=true&replicaSet=atlas-x4e2nh-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Configure CORS to allow requests from your frontend origin
app.use(cors());

// Create a schema and model for the order data
const orderSchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number, price: Number }],
  orderDate: Date,
});

const Order = mongoose.model('Order', orderSchema);

// Define API routes

// Route to retrieve all orders
app.get('/api/orders', async (req, res) => {
  try {
    // Fetch orders from the database
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Route to delete an order by ID
app.delete('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndRemove(orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

// WebSocket server code
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle new order messages
  socket.on('newOrder', async (newOrder) => {
    try {
      // Save the new order to the database
      const order = new Order(newOrder);
      await order.save();

      // Broadcast the new order to all connected clients
      io.emit('newOrder', order);
    } catch (error) {
      console.error('Error saving new order', error);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
