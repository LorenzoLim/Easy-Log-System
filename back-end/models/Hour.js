const { mongoose, db } = require('../database');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  type: String,
  total: Number,
  project_id: { type: Schema.Types.ObjectId, ref: 'Project'},
  user_id: { type: Schema.Types.ObjectId, ref: 'User'}
})

const Hour = mongoose.model('Hour', userSchema)

module.exports = Hour;
