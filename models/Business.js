const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
  userId: String,
  name: String,
  budget: Number,
  totalSpent: { type: Number, default: 0 },
  isEquity: {type: Boolean, default: false},
  isBusinessUpdated: {type: Boolean, default: false},
  equity: Number,
  valueEstimate: Number,
  deadline: Date,
  isFirstBusiness: {type: Boolean, default: true},
  incomePlatform: [String],
  isSelected: {type: Boolean, default: false},
  isExistingAudience: {type: Boolean, default: false},
  numberOfSocialFollowing: String,
  socialMediaPlatforms: [String],
  typesOfHires: [String],
  businessNiche: String,
  businessAddressLineOne: { type: String, default: '' },
  businessAddressLineTwo: { type: String, default: '' },
  businessCountry: { type: String, default: '' },
  businessFirstName: { type: String, default: '' },
  businessLastName: { type: String, default: '' },
  businessCity:  { type: String, default: '' },
  businessState:  { type: String, default: '' },
  businessZip:  { type: String, default: '' },
  paymentMethod: {
    card: String, 
    id: String
  },
  stripeId: String,
  totalTimeInvested: { type: Number, default: 0 },
  description: { type: String, default: '' },
  isProfessionalsUpdated: String,
  businessImage: String,
  createdBy: String,
  customMarkdown: String,
  businessCode: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  isSelected: {type: Boolean, default: false},
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  tags: { type: Schema.Types.Mixed, refs: 'tags'},
  tasks: { type: Schema.Types.Mixed, ref: 'tasks' },
  audience: { type: Schema.Types.ObjectId, ref: 'businessAudiences' },
  invoices: { type: Schema.Types.Mixed, ref: 'invoices' },
  departments: { type: Schema.Types.Mixed, ref: 'departments' },
  employees: { type: Schema.Types.Mixed, ref: 'businessAssociatesItems' },
  // refer to other users likes of this business
  likeTotal: { type: Number, default: 0 },
  dislikeTotal: { type: Number, default: 0 },
  likes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
  dislikes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
}, {
  timestamps: true
});

module.exports = mongoose.model('businesses', businessSchema);
