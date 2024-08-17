require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registration');
const feedbackRoutes = require('./routes/feedback');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('eventUpdate', (message) => {
    socket.broadcast.emit('eventUpdate', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
