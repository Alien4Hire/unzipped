const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessAssociatesItemSchema = new Schema({
  userId: Number,
  businessId: Number,
  profileId: Number,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  currentRate: Number,
  TotalStoryPoints: { type: Number, default: 1 },
}, {
  timestamps: true
});

module.exports = mongoose.model('businessAssociatesItems', businessAssociatesItemSchema);
