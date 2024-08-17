// seed.js
const mongoose = require('mongoose');
const Event = require('./models/Event');

const events = [
  { title: 'Event 1', date: '2024-08-01', description: 'Description for Event 1' },
  { title: 'Event 2', date: '2024-08-15', description: 'Description for Event 2' },
  { title: 'Event 3', date: '2024-09-01', description: 'Description for Event 3' }
];

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Event.insertMany(events);
  console.log('Dummy events added!');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error:', err);
});
