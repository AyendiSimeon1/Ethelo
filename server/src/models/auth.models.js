const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  profile: {
    // firstName: {
    //   type: String,
    //   trim: true
    // },
    // lastName: {
    //   type: String,
    //   trim: true
    // },
    // avatar: {
    //   type: String,
    //   default: 'default-avatar.png'
    // }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// userSchema.virtual('email').get(function() {
//   return `${this.firstName}`;
// });


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);