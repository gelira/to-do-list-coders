const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  due_date: {
    type: Date,
    required: false,
  },
  priority: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false,
  },
}, 
{
  collection: 'tasks',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

module.exports = mongoose.model('Task', TaskSchema);
