const { mongoose, db } = require('../database');
const Schema = mongoose.Schema;

const Project = mongoose.model('Project', {
	projectNum: String,
	projectLocation: String,
	projectName: String,
	projectStatus: String,
	projectUsers: [
		{ type: Schema.Types.ObjectId, ref: 'User'}
	]
});

module.exports = Project;
