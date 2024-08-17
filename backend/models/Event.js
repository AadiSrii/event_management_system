const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  description: { type: String },
  participantLimit: { type: Number },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }]
});

eventSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Event', eventSchema);
