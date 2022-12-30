const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  userId: String,
  businessId: String,
  departmentId: String,
  taskName: String,
  storyPoints: { type: Number, default: 1 },
  assigneeId: String,
  priority: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
  description: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  Status: { type: Number, default: 0 },
  tag: { type: Schema.Types.ObjectId, ref: 'tags' },
  department: { type: Schema.Types.ObjectId, ref: 'department' },
  assignee: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true
});

module.exports = mongoose.model('tasks', taskSchema);
